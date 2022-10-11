import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { OfficeInfo } from '@api/office-service/models';
import { combineLatest, EMPTY, iif, Observable, Subject } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { OfficeService } from '@app/services/company/office.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Icons } from '@shared/modules/icons/icons';
import { AddEditOfficeComponent } from '../../modals/add-edit-office/add-edit-office.component';

@Component({
	selector: 'do-office-list',
	templateUrl: './office-list.component.html',
	styleUrls: ['./office-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeListComponent implements AfterViewInit {
	public readonly Icons = Icons;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	public offices$!: Observable<OperationResultResponse<OfficeInfo[]>>;
	public filters: UntypedFormGroup;
	private _refreshCurrentPage$$: Subject<boolean>;

	constructor(
		private _modalService: DialogService,
		private _officeService: OfficeService,
		private _route: ActivatedRoute,
		private _fb: UntypedFormBuilder
	) {
		this.filters = this._fb.group({
			showDeactivated: [false],
		});
		this._refreshCurrentPage$$ = new Subject<boolean>();
	}

	public ngAfterViewInit(): void {
		this.offices$ = combineLatest([
			this.filters.valueChanges.pipe(
				startWith(null),
				tap(() => this.paginator?.firstPage())
			),
			this.paginator.page.pipe(startWith(null)),
			this._refreshCurrentPage$$.pipe(startWith(null)),
		]).pipe(
			switchMap(([filters, page, refresh]) =>
				filters !== null || page !== null || refresh
					? this.getOffices(filters, page)
					: this._route.data.pipe(map((response) => response.offices))
			),
			tap((res) => {
				this.paginator.length = res.totalCount ?? 0;
			})
		);
	}

	public onAddEditOffice(officeInfo?: OfficeInfo): void {
		this._modalService
			.openModal<AddEditOfficeComponent>(AddEditOfficeComponent, ModalWidth.M, officeInfo)
			.afterClosed()
			.subscribe({
				next: (result) => {
					this._refreshCurrentPage$$.next(true);
				},
			});
	}

	public onDeleteOffice(officeInfo: OfficeInfo): void {
		this._modalService
			.confirm({
				confirmText: `Да, удалить`,
				message: `Вы действительно хотите удалить офис ${officeInfo.name}?`,
				title: `Удаление офиса ${officeInfo.name}`,
			})
			.afterClosed()
			.pipe(
				switchMap((confirm) => {
					return iif(() => !!confirm, this._officeService.deleteOffice(officeInfo.id ?? ''), EMPTY);
				})
			)
			.subscribe((result) => {
				this._refreshCurrentPage$$.next(true);
			});
	}

	public onRestoreOffice(officeInfo: OfficeInfo): void {
		this._modalService
			.confirm({
				confirmText: `Да, восстановить`,
				message: `Вы действительно хотите восстановить офис ${officeInfo.name}?`,
				title: `Восстановление офиса ${officeInfo.name}`,
			})
			.afterClosed()
			.pipe(
				switchMap((confirm) => {
					return iif(() => !!confirm, this._officeService.restoreOffice(officeInfo.id ?? ''), EMPTY);
				})
			)
			.subscribe((result) => {
				this._refreshCurrentPage$$.next(true);
			});
	}

	public getOffices(filters: any, event: PageEvent | null): Observable<OperationResultResponse<OfficeInfo[]>> {
		return this._officeService.findOffices({
			skipCount: event ? event.pageIndex * event.pageSize : 0,
			takeCount: event ? event.pageSize : 10,
			includeDeactivated: filters?.showDeactivated,
		});
	}
}
