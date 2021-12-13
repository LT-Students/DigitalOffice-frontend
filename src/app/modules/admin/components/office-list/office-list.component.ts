import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ModalService, ModalWidth } from '@app/services/modal.service';
import { OfficeInfo } from '@data/api/company-service/models';
import { combineLatest, EMPTY, iif, Observable, Subject } from 'rxjs';
import { OperationResultResponse, OperationResultStatusType } from '@app/types/operation-result-response.interface';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { OfficeService } from '@app/services/company/office.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddEditOfficeComponent } from '../../modals/add-edit-office/add-edit-office.component';

@Component({
	selector: 'do-office-list',
	templateUrl: './office-list.component.html',
	styleUrls: ['./office-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeListComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	public offices$!: Observable<OperationResultResponse<OfficeInfo[]>>;
	public filters: FormGroup;
	private _refreshCurrentPage$$: Subject<boolean>;

	constructor(
		private _modalService: ModalService,
		private _officeService: OfficeService,
		private _route: ActivatedRoute,
		private _fb: FormBuilder
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
					if (result?.status !== OperationResultStatusType.Failed) {
						this._refreshCurrentPage$$.next(true);
					}
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
				if (result?.status !== OperationResultStatusType.Failed) {
					this._refreshCurrentPage$$.next(true);
				}
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
