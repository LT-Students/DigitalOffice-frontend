import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserApiService } from '@data/api/project-service/services/user-api.service';
import { ProjectUserRoleType } from '@data/api/project-service/models/project-user-role-type';
import { ICreateUserRequest, ProjectService } from '@app/services/project/project.service';
import { DepartmentService } from '@app/services/department/department.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { map, tap } from 'rxjs/operators';

export enum OpenAddEmployeeModalFrom {
	Default = '',
	Project = 'Проект',
	Department = 'Департамент',
}

@Component({
	selector: 'do-modal-add-employee',
	templateUrl: './add-employee.component.html',
	styleUrls: ['./add-employee.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent implements OnInit {
	public positions: string[];
	public employees: UserInfo[];
	public displayedColumns: string[];
	public dataSource: MatTableDataSource<UserInfo>;
	public selection: SelectionModel<UserInfo>;
	public usersFound: boolean;
	public moduleName: string;
	public openFromRu: OpenAddEmployeeModalFrom;
	public employeeCountMap: { [k: string]: string };
	public countToHide: number;
	public isAllReceived: boolean;

	private _takeUsers: number;
	private _skipUsers: number;

	constructor(
		private _userService: UserService,
		private _cdr: ChangeDetectorRef,
		private _dialogRef: MatDialogRef<AddEmployeeComponent>,

		@Inject(MAT_DIALOG_DATA)
		private _data: { idToHide: string[]; pageId: string; openFrom: OpenAddEmployeeModalFrom; moduleName: string }
	) {
		this.isAllReceived = false;
		this.countToHide = 0;
		this.positions = ['NOT IMPLEMENTED YET']; //[ 'front', 'back', 'manager', 'lead' ];
		this.employees = [];
		this._takeUsers = 6;
		this._skipUsers = 0;
		this.displayedColumns = ['select', 'name', 'department'];
		this.selection = new SelectionModel<UserInfo>(true, []);
		this.dataSource = new MatTableDataSource();
		this.usersFound = false;
		this.moduleName = this._data.moduleName;
		this.openFromRu = OpenAddEmployeeModalFrom.Default;

		this.employeeCountMap = {
			one: 'Добавить # сотрудника',
			few: 'Добавить # сотрудника',
			other: 'Добавить # сотрудников',
		};
	}

	public ngOnInit(): void {
		this.getPageUsers();
		this.openFromRu = this._data.openFrom;
	}

	public onClose(result?: UserInfo[]): void {
		this._dialogRef.close(result);
	}

	public getPageUsers(): void {
		if (this.isAllReceived) return;

		this._userService
			.findUsers({
				skipCount: this._skipUsers,
				takeCount: this._takeUsers + (this.countToHide || this._data.idToHide.length),
				includedepartment: true,
				includeposition: true,
				includecurrentavatar: true,
			})
			.pipe(
				tap((result) => {
					if (result.body) {
						this.usersFound = true;
						this._skipUsers += result.body?.length ?? 0;
					}
					if (this._skipUsers >= (result.totalCount ?? 0)) {
						this.isAllReceived = true;
					}
				}),
				map((result) => result.body ?? ([] as UserInfo[]))
			)
			.subscribe((users) => {
				const viewed = users.filter((e) => this._data.idToHide.indexOf(e.id as string) === -1);
				this.countToHide = users.length - viewed.length;
				this.employees.push(...viewed);
				this.dataSource = new MatTableDataSource(this.employees);

				this._cdr.markForCheck();
			});
	}
}
