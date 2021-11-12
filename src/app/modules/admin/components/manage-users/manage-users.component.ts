import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { EMPTY, from, iif, Observable, ReplaySubject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { UserInfo } from '@data/api/user-service/models/user-info';
import { IFindUsers, UserService } from '@app/services/user/user.service';
import { OperationResultStatusType } from '@data/api/user-service/models';
import { ModalService } from '@app/services/modal.service';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange } from '@angular/material/select/select';
import { NewEmployeeComponent } from '../../modals/new-employee/new-employee.component';

@Component({
	selector: 'do-manage-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsersComponent {
	@ViewChild(MatSort) sort: MatSort | undefined;

	public users$: Observable<OperationResultResponse<UserInfo[]>>;
	private _userParams: ReplaySubject<IFindUsers>;
	private _includedeactivated: boolean;
	constructor(
		private _userService: UserService,
		private _modalService: ModalService,
		private _route: ActivatedRoute
	) {
		this._includedeactivated = false;
		this._userParams = new ReplaySubject<IFindUsers>(1);
		this.users$ = this._userParams.pipe(
			startWith(null),
			switchMap((params: IFindUsers | null) =>
				iif(
					() => !!params,
					this._userService.findUsers(params as IFindUsers),
					this._route.data.pipe(map((response) => response.users))
				)
			)
		);
	}

	public selectionChangeHandler(event: MatSelectChange): void {
		if (event.value === 'all') {
			this._includedeactivated = true;
			console.log(this._includedeactivated);
		} else {
			this._includedeactivated = false;
			console.log(this._includedeactivated);
		}
		this._userParams.next({
			skipCount: 0,
			takeCount: 10,
			includeavatar: true,
			includeposition: true,
			includedepartment: true,
			includerole: true,

			includedeactivated: this._includedeactivated,
		});
	}

	public onPageChange(event: PageEvent): void {
		this._userParams.next({
			skipCount: event.pageIndex * event.pageSize,
			takeCount: event.pageSize,
			includeavatar: true,
			includeposition: true,
			includedepartment: true,
			includerole: true,
			includedeactivated: this._includedeactivated,
		});
		console.log(this._userParams);
	}

	public onAddEmployeeClick(): void {
		this._modalService
			.openModal<NewEmployeeComponent, null, OperationResultResponse<UserInfo[]>>(NewEmployeeComponent)
			.afterClosed()
			.pipe(withLatestFrom(this._userParams))
			.subscribe(([result, params]) => {
				if (result?.status === OperationResultStatusType.FullSuccess) {
					this._userParams.next(params);
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
					switchMap((confirm) => iif(() => !!confirm, this._userService.disableUser(user?.id), EMPTY)),
					switchMap(() => this._userParams)
				)
				.subscribe((params) => this._userParams.next(params));
		} else {
			this._modalService
				.confirm({
					confirmText: 'Да, восстановить',
					title: 'Восстановление пользователя',
					message: 'Вы действительно хотите восстановить этого пользователя?',
				})
				.afterClosed()
				.pipe(
					switchMap((confirm) => iif(() => !!confirm, this._userService.activateUser(user?.id), EMPTY)),
					switchMap(() => this._userParams)
				)
				.subscribe((params) => this._userParams.next(params));
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
