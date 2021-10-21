import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserApiService } from '@data/api/project-service/services/user-api.service';
import { ProjectUserRoleType } from '@data/api/project-service/models/project-user-role-type';
import { ICreateUserRequest, ProjectService } from '@app/services/project/project.service';

@Component({
	selector: 'do-modal-add-employee',
	templateUrl: './add-employee.component.html',
	styleUrls: ['./add-employee.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent implements OnInit {
	public positions: string[];
	public employees: UserInfo[];
	private _takeUsers: number;
	private _skipUsers: number;
	public displayedColumns: string[];
	public dataSource: MatTableDataSource<UserInfo>;
	public selection: SelectionModel<UserInfo>;

	constructor(
		private _userService: UserService,
		private _userApiService: UserApiService,
		private _cdr: ChangeDetectorRef,
		private _dialogRef: MatDialogRef<AddEmployeeComponent>,
		private _projectService: ProjectService,
		@Inject(MAT_DIALOG_DATA) private _data: { idToHide: string[]; pageId: string }
	) {
		this.positions = ['front', 'back', 'manager', 'lead'];
		this.employees = [];
		this._takeUsers = 6;
		this._skipUsers = 0;
		this.displayedColumns = ['select', 'name', 'department'];
		this.selection = new SelectionModel<UserInfo>(true, []);
		this.dataSource = new MatTableDataSource();
	}
	public ngOnInit(): void {
		this.getPageUsers();
	}

	public onClose(): void {
		this._dialogRef.close();
	}

	public getPageUsers(): void {
		this._userService
			.findUsers({
				skipCount: this._skipUsers,
				takeCount: this._takeUsers,
				includedepartment: true,
				includeposition: true,
			})
			.subscribe((data) => {
				console.log(data.body);
				if (data.body !== undefined) {
					data.body = data.body.filter((e) => this._data.idToHide.indexOf(e.id as string) === -1);
					this.employees.push(...data.body);
					this.dataSource = new MatTableDataSource(this.employees);
					this._skipUsers += data.body.length;
					this._cdr.markForCheck();
				}
			});
	}

	public addToProject(): void {
		const users: Array<ICreateUserRequest> = this.selection.selected.reduce(function (
			newArr: Array<ICreateUserRequest>,
			user
		) {
			newArr.push({ role: ProjectUserRoleType.Employee, userId: user.id ?? '' });

			return newArr;
		},
		[]);

		this._projectService.addUsersToProject({ projectId: this._data.pageId, users: [...users] }).subscribe(() => {
			this._cdr.markForCheck();
		});
	}
}