import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { NetService } from '@app/services/net.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/services/user/user.service';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { PageEvent } from '@angular/material/paginator';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { OperationResultStatusType } from '@data/api/user-service/models';
import { MatDialog } from '@angular/material/dialog';
import { NewEmployeeComponent } from '../../modals/new-employee/new-employee.component';
import { NewDepartmentComponent } from '../../modals/new-department/new-department.component';
import { IDialogResponse } from '../../../user/components/user-tasks/user-tasks.component';
import { AddEmployeeComponent } from '../../../../shared/modals/add-employee/add-employee.component';

export interface EditModalContent {
	id?: string;
	name: string;
	description?: string | null;
	directorid?: string;
}

@Component({
	selector: 'do-department-card',
	templateUrl: './department-card.component.html',
	styleUrls: ['./department-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentCardComponent implements OnInit {
	public departmentInfo: DepartmentInfo | undefined;
	public sortedUsersInfo: UserInfo[];
	private _departmentId: string;

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;
	public peopleCountMap: { [k: string]: string };

	constructor(
		private _netService: NetService,
		private _userService: UserService,
		private _router: Router,
		private _modalService: ModalService,
		private _route: ActivatedRoute,
		private _cdr: ChangeDetectorRef,
		private _dialog: MatDialog
	) {
		this._departmentId = this._route.snapshot.params.id;
		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
		this.sortedUsersInfo = [];

		this.peopleCountMap = {
			few: '# человека',
			other: '# человек',
		};
	}

	ngOnInit(): void {
		this._getDepartment();
	}

	private _getDepartment(): void {
		this._netService
			.getDepartment({ departmentid: this._departmentId, includeusers: true })
			.subscribe(({ body }) => {
				this.departmentInfo = body?.department;
				this.totalCount = body?.users?.length ?? 0;
				//this.sortedUsersInfo = body?.users?.slice() ?? [];
				this._getUsers();
				this._cdr.markForCheck();
			});
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getUsers();
	}

	private _getUsers(): void {
		this._userService
			.findUsers(this.pageIndex * this.pageSize, this.pageSize, this._departmentId)
			.subscribe((data) => {
				this.sortedUsersInfo = data?.body?.slice() ?? [];
				this.totalCount = this.sortedUsersInfo.length;
				this._cdr.markForCheck();
			});
	}

	onAddEmployeeClick() {
		this._modalService
			.openModal<NewEmployeeComponent, null, any>(NewEmployeeComponent)
			.afterClosed()
			.subscribe((result) => {
				if (result?.status === 'FullSuccess') this._getUsers();
			});
	}

	public onEditDepartamentClick(): void {
		const data: EditModalContent = {
			id: this.departmentInfo?.id,
			name: this.departmentInfo?.name ? this.departmentInfo?.name : '',
			description: this.departmentInfo?.description ? this.departmentInfo?.description : '',
			directorid: this.departmentInfo?.director?.id ? this.departmentInfo?.director?.id : '',
		};
		this._modalService
			.openModal<NewDepartmentComponent, EditModalContent, IDialogResponse>(
				NewDepartmentComponent,
				ModalWidth.M,
				data
			)
			.afterClosed()
			.subscribe((result) => {
				if (result?.status === OperationResultStatusType.FullSuccess) this._getDepartment();
			});
	}

	onUserClick(userId: string | undefined) {
		this._router.navigate([`/user/${userId}`]);
	}

	public sortData(sort: Sort): void {
		// const data = this.departmentInfo.users.slice();
		// if (!sort.active || sort.direction === '') {
		// 	this.sortedUsersInfo = data;
		// 	return;
		// }
		// this.sortedUsersInfo = data.sort((a: UserInfo, b: UserInfo) => {
		// 	const isAsc = sort.direction === 'asc';
		// 	switch (sort.active) {
		// 		case 'name':
		// 			return this._compare(a.firstName, b.firstName, isAsc);
		// 		case 'role':
		// 			return this._compare(a.role, b.role, isAsc);
		// 		case 'rate':
		// 			return this._compare(a.rate, b.rate, isAsc);
		// 		case 'status':
		// 			return this._compare(a.status, b.status, isAsc);
		// 		default:
		// 			return 0;
		// 	}
		// });
	}

	private _compare(a: number | string, b: number | string, isAsc: boolean) {
		if (typeof a === 'undefined' || typeof b === 'undefined') {
			return 0;
		}
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
	public openDialog(): void {
		this._dialog.open(AddEmployeeComponent, {
			data: { idToHide: ['e59a60de-5e29-4678-b70d-567c0c29bc65'] },
			maxWidth: '670px',
		});
	}
}
