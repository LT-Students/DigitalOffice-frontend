import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { combineLatest, EMPTY, iif, Observable, Subject } from 'rxjs';
import { OperationResultResponse, OperationResultStatusType } from '@app/types/operation-result-response.interface';
import { IPositionInfo, PositionService } from '@app/services/position/position.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PositionInfo } from '@api/position-service/models/position-info';
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
		private _modalService: DialogService,
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
				startWith({ showDeactivated: false }),
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

	public onDeletePosition(positionInfo: PositionInfo): void {
		this._modalService
			.confirm({
				confirmText: 'Да, удалить',
				title: `Удаление должности ${positionInfo.name}`,
				message: `Вы действительно хотите удалить должность ${positionInfo.name}`,
			})
			.afterClosed()
			.pipe(
				switchMap((confirm) =>
					iif(() => !!confirm, this._positionService.deletePosition(positionInfo.id ?? ''), EMPTY)
				)
			)
			.subscribe((result) => {
				if (result.status !== OperationResultStatusType.Failed) {
					this._refreshCurrentPage$$.next(true);
				}
			});
	}

	public onRestorePosition(positionInfo: PositionInfo): void {
		this._modalService
			.confirm({
				confirmText: 'Да, восстановить',
				title: `Восстановление должности ${positionInfo.name}`,
				message: `Вы действительно хотите восстановить должность ${positionInfo.name}`,
			})
			.afterClosed()
			.pipe(
				switchMap((confirm) =>
					iif(() => !!confirm, this._positionService.restorePosition(positionInfo.id ?? ''), EMPTY)
				)
			)
			.subscribe((result) => {
				if (result.status !== OperationResultStatusType.Failed) {
					this._refreshCurrentPage$$.next(true);
				}
			});
	}

	public getPositions(filters: any, event: PageEvent | null): Observable<OperationResultResponse<PositionInfo[]>> {
		return this._positionService.findPositions({
			skipcount: event ? event.pageIndex * event.pageSize : 0,
			takecount: event ? event.pageSize : 10,
			includedeactivated: filters.showDeactivated,
		});
	}
}
