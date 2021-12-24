import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';

import { RoleInfo } from '@data/api/rights-service/models';
import { RightsService } from '@app/services/rights/rights.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { combineLatest, EMPTY, iif, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { OperationResultResponse, OperationResultStatusType } from '@app/types/operation-result-response.interface';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddEditRoleComponent } from '../../modals/add-edit-role/add-edit-role.component';

@Component({
	selector: 'do-manage-roles',
	templateUrl: './manage-roles.component.html',
	styleUrls: ['./manage-roles.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageRolesComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	public roles$!: Observable<OperationResultResponse<RoleInfo[]>>;
	public filters: FormGroup;
	private _refreshCurrentPage$$: Subject<boolean>;

	constructor(
		private _modalService: ModalService,
		private _rightsService: RightsService,
		private _route: ActivatedRoute,
		private _fb: FormBuilder
	) {
		this.filters = this._fb.group({
			showDeactivated: [false],
		});
		this._refreshCurrentPage$$ = new Subject<boolean>();
	}

	public ngAfterViewInit(): void {
		this.roles$ = combineLatest([
			this.filters.valueChanges.pipe(
				startWith({ showDeactivated: false }),
				tap(() => this.paginator?.firstPage())
			),
			this.paginator.page.pipe(startWith(null)),
			this._refreshCurrentPage$$.pipe(startWith(null)),
		]).pipe(
			switchMap(([filters, page, refresh]) =>
				filters !== null || page !== null || refresh
					? this.getRoles(filters, page)
					: this._route.data.pipe(map((response) => response.roles))
			),
			tap((res) => {
				this.paginator.length = res.totalCount ?? 0;
			})
		);
	}

	public onAddEditRole(roleInfo?: RoleInfo): void {
		this._modalService
			.openModal<AddEditRoleComponent>(AddEditRoleComponent, ModalWidth.M, roleInfo)
			.afterClosed()
			.subscribe({
				next: (result) => {
					if (result?.status !== OperationResultStatusType.Failed) {
						this._refreshCurrentPage$$.next(true);
					}
				},
			});
	}

	public onDeleteRole(roleInfo: RoleInfo): void {
		this._modalService
			.confirm({
				confirmText: 'Да, удалить роль',
				title: `Удаление роли ${roleInfo.localizations?.[0]?.name}`,
				message: `Вы действительно хотите удалить роль ${roleInfo.localizations?.[0]?.name}?`,
			})
			.afterClosed()
			.pipe(
				switchMap((confirm) => {
					return iif(
						() => !!confirm,
						this._rightsService.deleteRole({
							roleId: roleInfo.id ?? '',
							isActive: false,
						}),
						EMPTY
					);
				})
			)
			.subscribe((result) => {
				if (result?.status !== OperationResultStatusType.Failed) {
					this._refreshCurrentPage$$.next(true);
				}
			});
	}

	public onRestoreRole(roleInfo: RoleInfo): void {
		this._modalService
			.confirm({
				confirmText: 'Да, восстановить роль',
				title: `Восстановление роли ${roleInfo.localizations?.[0]?.name}`,
				message: `Вы действительно хотите восстановить роль ${roleInfo.localizations?.[0]?.name}?`,
			})
			.afterClosed()
			.pipe(
				switchMap((confirm) => {
					return iif(
						() => !!confirm,
						this._rightsService.restoreRole({
							roleId: roleInfo.id ?? '',
							isActive: true,
						}),
						EMPTY
					);
				})
			)
			.subscribe((result) => {
				if (result?.status !== OperationResultStatusType.Failed) {
					this._refreshCurrentPage$$.next(true);
				}
			});
	}

	public getRoles(filters: any, event: PageEvent | null): Observable<OperationResultResponse<RoleInfo[]>> {
		return this._rightsService.findRoles({
			skipCount: event ? event.pageIndex * event.pageSize : 0,
			takeCount: event ? event.pageSize : 10,
			includeDeactivated: filters.showDeactivated,
		});
	}
}
