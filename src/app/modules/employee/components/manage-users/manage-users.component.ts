import { Component, ViewChild, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { EMPTY, iif, Observable, Subject, combineLatest } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { UserInfo } from '@api/user-service/models/user-info';
import { UserService } from '@app/services/user/user.service';
import { OperationResultStatusType } from '@api/user-service/models';
import { ModalService } from '@app/services/modal.service';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewEmployeeComponent } from '@shared/modals/new-employee/new-employee.component';

@Component({
	selector: 'do-manage-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsersComponent implements AfterViewInit {
	@ViewChild(MatSort) sort: MatSort | undefined;
	@ViewChild(MatPaginator) paginator?: MatPaginator;

	public users$: Observable<OperationResultResponse<UserInfo[]>>;
	public filters: FormGroup;
	private _refreshCurrentPage$$: Subject<void>;

	constructor(
		private _userService: UserService,
		private _modalService: ModalService,
		private _route: ActivatedRoute,
		private _fb: FormBuilder
	) {
		this._refreshCurrentPage$$ = new Subject<void>();
		this.filters = this._fb.group({
			showDeactivatedUsers: [false],
		});
		this.users$ = new Observable<OperationResultResponse<UserInfo[]>>();
	}

	public ngAfterViewInit(): void {
		if (this.paginator !== undefined) {
			this.users$ = combineLatest([
				this.filters.valueChanges.pipe(
					startWith(null),
					tap(() => this.paginator?.firstPage())
				),
				this.paginator.page.pipe(startWith(null)),
				this._refreshCurrentPage$$.pipe(startWith(null)),
			]).pipe(
				switchMap(([filters, page]) =>
					filters !== null || page !== null
						? this.getUsers(filters, page)
						: this._route.data.pipe(map((response) => response.users))
				),
				tap((res) => {
					if (this.paginator) {
						this.paginator.length = res.totalCount ?? 0;
					}
				})
			);
		}
	}

	public getUsers(filters: any, event: PageEvent | null): Observable<OperationResultResponse<UserInfo[]>> {
		return this._userService.findUsers({
			skipCount: event ? event.pageIndex * event.pageSize : 0,
			takeCount: event ? event.pageSize : 10,
			includecurrentavatar: true,
			includeposition: true,
			includedepartment: true,
			includerole: true,
			includedeactivated: filters?.showDeactivatedUsers,
		});
	}

	public onAddEmployeeClick(): void {
		this._modalService
			.openModal<NewEmployeeComponent, null, OperationResultResponse<UserInfo[]>>(NewEmployeeComponent)
			.afterClosed()
			.subscribe((result) => {
				if (result?.status === OperationResultStatusType.FullSuccess) {
					this._refreshCurrentPage$$.next();
				}
			});
	}

	public toggleUserStatus(user: UserInfo, evt: Event): void {
		evt.stopPropagation();
		if (user.isActive) {
			this._modalService
				.confirm({
					confirmText: 'Да, удалить',
					title: 'Удаление пользователя',
					message: 'Вы действительно хотите удалить этого пользователя?',
				})
				.afterClosed()
				.pipe(
					switchMap((confirm) =>
						iif(() => !!confirm, this._userService.disableUser(user.id as string), EMPTY)
					)
				)
				.subscribe(() => {
					this._refreshCurrentPage$$.next();
					this.filters.setValue({ showDeactivatedUsers: false });
				});
		} else {
			this._modalService
				.confirm({
					confirmText: 'Да, восстановить',
					title: 'Восстановление пользователя',
					message: 'Вы действительно хотите восстановить этого пользователя?',
				})
				.afterClosed()
				.pipe(
					switchMap((confirm) =>
						iif(() => !!confirm, this._userService.activateUser(user.id as string), EMPTY)
					)
				)
				.subscribe(() => {
					this._refreshCurrentPage$$.next();
				});
		}
	}

	public sortData(sort: Sort): void {
		// 	const data = this.users$?.slice();
		// 	if (!sort.active || sort.direction === '') {
		// 		this.users$ = data;
		// 		return;
		// 	}
		//
		// 	this.users$ = data?.sort((a: UserInfo, b: UserInfo) => {
		// 		const isAsc = sort.direction === 'asc';
		// 		switch (sort.active) {
		// 			case 'name':
		// 				return this._compare(a.firstName, b.firstName, isAsc);
		// 			case 'department':
		// 				return this._compare(a.department?.name, b.department?.name, isAsc);
		// 			case 'role':
		// 				return this._compare(a.position?.name, b.position?.name, isAsc);
		// 			case 'rate':
		// 				return this._compare(a.rate, b.rate, isAsc);
		// 			case 'status':
		// 				return this._compare(a.status, b.status, isAsc);
		// 			default:
		// 				return 0;
		// 		}
		// 	});
	}

	//
	// private _compare(a: number | string | undefined, b: number | string | undefined, isAsc: boolean) {
	// 	if (typeof a === 'undefined' || typeof b === 'undefined') {
	// 		return 0;
	// 	}
	// 	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	// }
}
