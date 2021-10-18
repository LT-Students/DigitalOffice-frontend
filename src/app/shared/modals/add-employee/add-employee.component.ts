import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnInit, Inject } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserApiService } from '@data/api/project-service/services/user-api.service';
import { ProjectUserRoleType } from '@data/api/project-service/models/project-user-role-type';
import { ModalService } from '@app/services/modal.service';

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
				skipCount: this._skipUsers * this._takeUsers,
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
		console.log(this.selection.selected);

		const arr: any = [];
		this.selection.selected.map((e) => {
			return arr.push({ role: ProjectUserRoleType.Employee, userId: e.id });
		});

		this._userApiService
			.addUsersToProject({
				body: { projectId: this._data.pageId, users: [...arr] },
			})
			.subscribe(() => {
				this._cdr.markForCheck();
			});
	}
}
