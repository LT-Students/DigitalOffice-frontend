import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ModalService, ModalWidth } from '@app/services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { OperationResultResponse, OperationResultStatusType } from '@app/types/operation-result-response.interface';
import { IPositionInfo, PositionService } from '@app/services/position/position.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PositionInfo } from '@data/api/position-service/models/position-info';
import { AddEditPositionComponent } from '../../modals/add-edit-position/add-edit-position.component';

@Component({
	selector: 'do-position-list',
	templateUrl: './position-list.component.html',
	styleUrls: ['./position-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionListComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	public positions$!: Observable<OperationResultResponse<IPositionInfo[]>>;
	public filters: FormGroup;
	private _refreshCurrentPage$$: Subject<boolean>;

	constructor(
		private _modalService: ModalService,
		private _positionService: PositionService,
		private _route: ActivatedRoute,
		private _fb: FormBuilder
	) {
		this.filters = this._fb.group({
			showDeactivated: [false],
		});
		this._refreshCurrentPage$$ = new Subject<boolean>();
	}

	public ngAfterViewInit(): void {
		this.positions$ = combineLatest([
			this.filters.valueChanges.pipe(
				startWith(null),
				tap(() => this.paginator?.firstPage())
			),
			this.paginator.page.pipe(startWith(null)),
			this._refreshCurrentPage$$.pipe(startWith(null)),
		]).pipe(
			switchMap(([filters, page, refresh]) =>
				filters !== null || page !== null || refresh
					? this.getPositions(filters, page)
					: this._route.data.pipe(map((response) => response.positions))
			),
			tap((res) => {
				this.paginator.length = res.totalCount ?? 0;
			})
		);
	}

	public onAddEditPosition(positionInfo?: PositionInfo): void {
		this._modalService
			.openModal<AddEditPositionComponent>(AddEditPositionComponent, ModalWidth.M, positionInfo)
			.afterClosed()
			.subscribe({
				next: (result) => {
					if (result?.status !== OperationResultStatusType.Failed) {
						this._refreshCurrentPage$$.next(true);
					}
				},
			});
	}

	public getPositions(filters: any, event: PageEvent | null): Observable<OperationResultResponse<PositionInfo[]>> {
		return this._positionService.findPositions({
			skipcount: event ? event.pageIndex * event.pageSize : 0,
			takecount: event ? event.pageSize : 10,
			includedeactivated: filters?.showDeactivated,
		});
	}
}
