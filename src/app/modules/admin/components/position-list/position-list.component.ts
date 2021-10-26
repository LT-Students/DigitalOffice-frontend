import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { ModalService } from '@app/services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { iif, Observable, ReplaySubject } from 'rxjs';
import { IPositionInfo, PositionService } from '@app/services/company/position.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { NewPositionComponent } from '../../modals/new-position/new-position.component';

@Component({
	selector: 'do-position-list',
	templateUrl: './position-list.component.html',
	styleUrls: ['./position-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionListComponent {
	private _positions: ReplaySubject<IFindRequestEx>;
	public positions$: Observable<OperationResultResponse<IPositionInfo[]>>;

	constructor(
		private _modalService: ModalService,
		private _positionService: PositionService,
		private _route: ActivatedRoute
	) {
		this._positions = new ReplaySubject<IFindRequestEx>(1);
		this.positions$ = this._positions.pipe(
			startWith(null),
			switchMap((params: IFindRequestEx | null) =>
				iif(
					() => !!params,
					this._positionService.findPositions(params as IFindRequestEx),
					this._route.data.pipe(map((response) => response.positions))
				)
			)
		);
	}

	public onAddPositionClick(): void {
		this._modalService
			.openModal<NewPositionComponent, null, any>(NewPositionComponent)
			.afterClosed()
			.pipe(withLatestFrom(this._positions))
			.subscribe(([result, params]) => {
				if (result?.status === 'FullSuccess') {
					this._positions.next(params);
				}
			});
	}

	public onPageChange(event: PageEvent): void {
		this._positions.next({
			skipCount: event.pageIndex * event.pageSize,
			takeCount: event.pageSize,
		});
	}
}
