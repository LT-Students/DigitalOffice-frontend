import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { combineLatest, EMPTY, iif, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { RoleInfo } from '@api/rights-service/models';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { RightsService } from '@app/services/rights/rights.service';
import { ModalWidth } from '@app/services/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { AddEditRoleComponent } from '../../modals/add-edit-role/add-edit-role.component';

@Component({
	selector: 'do-manage-roles',
	templateUrl: './manage-roles.component.html',
	styleUrls: ['./manage-roles.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageRolesComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	public readonly Icons = Icons;

	public roles$!: Observable<OperationResultResponse<RoleInfo[]>>;
	public filters: UntypedFormGroup;
	private _refreshCurrentPage$$: Subject<boolean>;

	constructor(
		private dialog: DialogService,
		private _rightsService: RightsService,
		private _route: ActivatedRoute,
		private _fb: UntypedFormBuilder
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
		this.dialog.open(AddEditRoleComponent, { width: ModalWidth.M, data: roleInfo }).closed.subscribe({
			next: () => {
				this._refreshCurrentPage$$.next(true);
			},
		});
	}

	public onDeleteRole(roleInfo: RoleInfo): void {
		this.dialog
			.confirm({
				confirmText: 'Да, удалить роль',
				title: `Удаление роли ${roleInfo.localizations?.[0]?.name}`,
				message: `Вы действительно хотите удалить роль ${roleInfo.localizations?.[0]?.name}?`,
			})
			.closed.pipe(
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
			.subscribe(() => {
				this._refreshCurrentPage$$.next(true);
			});
	}

	public onRestoreRole(roleInfo: RoleInfo): void {
		this.dialog
			.confirm({
				confirmText: 'Да, восстановить роль',
				title: `Восстановление роли ${roleInfo.localizations?.[0]?.name}`,
				message: `Вы действительно хотите восстановить роль ${roleInfo.localizations?.[0]?.name}?`,
			})
			.closed.pipe(
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
			.subscribe(() => {
				this._refreshCurrentPage$$.next(true);
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
