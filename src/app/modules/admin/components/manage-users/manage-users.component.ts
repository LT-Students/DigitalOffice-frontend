import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { EMPTY, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { UserInfo } from '@data/api/user-service/models/user-info';
import { UserService } from '@app/services/user/user.service';
import { OperationResultResponse, OperationResultStatusType } from '@data/api/user-service/models';
import { EducationType } from '@data/api/user-service/models/education-type';
import { ModalService } from '@app/services/modal.service';
import { switchMap } from 'rxjs/operators';
import { NewEmployeeComponent } from '../../modals/new-employee/new-employee.component';

@Component({
	selector: 'do-manage-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsersComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort | undefined;

	public displayedColumns: string[];
	public userInfo: UserInfo[] | undefined;
	public sortedUserInfo: UserInfo[] | undefined;
	public studyTypes: EducationType[];
	private _unsubscribe$: Subject<void>;

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

	constructor(
		private _userService: UserService,
		private _modalService: ModalService,
		private _cdr: ChangeDetectorRef
	) {
		this._unsubscribe$ = new Subject<void>();
		this.displayedColumns = ['name', 'department', 'role', 'rate', 'status', 'edit'];
		this.userInfo = [];
		this.sortedUserInfo = [];
		this.studyTypes = [EducationType.Offline, EducationType.Online];

		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
	}

	public ngOnInit(): void {
		this._getPageUsers();
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getPageUsers();
	}

	public onAddEmployeeClick() {
		this._modalService
			.openModal<NewEmployeeComponent, null, OperationResultResponse>(NewEmployeeComponent)
			.afterClosed()
			.subscribe((result) => {
				console.log('СТАТУС МЕНЕДЖ ЮЗЕРС: ', result?.status);
				if (result?.status === OperationResultStatusType.FullSuccess) {
					this._getPageUsers();
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
				.pipe(switchMap((confirm) => (confirm ? this._userService.disableUser(user?.id) : EMPTY)))
				.subscribe(() => this._getPageUsers());
		} else {
			this._modalService
				.confirm({
					confirmText: 'Да, восстановить',
					title: 'Восстановление пользователя',
					message: 'Вы действительно хотите восстановить этого пользователя?',
				})
				.afterClosed()
				.pipe(switchMap((confirm) => (confirm ? this._userService.activateUser(user?.id) : EMPTY)))
				.subscribe(() => this._getPageUsers());
		}
	}

	public sortData(sort: Sort): void {
		const data = this.userInfo?.slice();
		if (!sort.active || sort.direction === '') {
			this.sortedUserInfo = data;
			return;
		}

		this.sortedUserInfo = data?.sort((a: UserInfo, b: UserInfo) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'name':
					return this._compare(a.firstName, b.firstName, isAsc);
				case 'department':
					return this._compare(a.department?.name, b.department?.name, isAsc);
				case 'role':
					return this._compare(a.position?.name, b.position?.name, isAsc);
				case 'rate':
					return this._compare(a.rate, b.rate, isAsc);
				case 'status':
					return this._compare(a.status, b.status, isAsc);
				default:
					return 0;
			}
		});
	}

	private _compare(a: number | string | undefined, b: number | string | undefined, isAsc: boolean) {
		if (typeof a === 'undefined' || typeof b === 'undefined') {
			return 0;
		}
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}

	private _getPageUsers(): void {
		this._userService.findUsers(this.pageIndex * this.pageSize, this.pageSize).subscribe((data) => {
			this.totalCount = data?.totalCount ?? 0;
			this.userInfo = data?.body?.slice() ?? [];
			this.sortedUserInfo = data?.body?.slice() ?? [];
			this._cdr.markForCheck();
		});
	}
}
