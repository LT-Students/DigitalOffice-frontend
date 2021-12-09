import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

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
	private _takeUsers: number;
	private _skipUsers: number;
	public displayedColumns: string[];
	public dataSource: MatTableDataSource<UserInfo>;
	public selection: SelectionModel<UserInfo>;
	public usersFound: boolean;
	public moduleName: string;
	public openFromRu: OpenAddEmployeeModalFrom;

	constructor(
		private _userService: UserService,
		private _cdr: ChangeDetectorRef,
		private _dialogRef: MatDialogRef<AddEmployeeComponent>,

		@Inject(MAT_DIALOG_DATA)
		private _data: { idToHide: string[]; pageId: string; openFrom: OpenAddEmployeeModalFrom; moduleName: string }
	) {
		this.positions = ['front', 'back', 'manager', 'lead'];
		this.employees = [];
		this._takeUsers = 6;
		this._skipUsers = 0;
		this.displayedColumns = ['select', 'name', 'department'];
		this.selection = new SelectionModel<UserInfo>(true, []);
		this.dataSource = new MatTableDataSource();
		this.usersFound = false;
		this.moduleName = this._data.moduleName;
		this.openFromRu = OpenAddEmployeeModalFrom.Default;
	}

	public ngOnInit(): void {
		this.getPageUsers();
		this.openFromRu = this._data.openFrom;
	}

	public onClose(result?: UserInfo[]): void {
		this._dialogRef.close(result);
	}

	public getPageUsers(): void {
		this._userService
			.findUsers({
				skipCount: this._skipUsers,
				takeCount: this._takeUsers + this._data.idToHide.length,
				includedepartment: true,
				includeposition: true,
			})
			.subscribe((data) => {
				if (data.body !== undefined) {
					data.body = data.body.filter((e) => this._data.idToHide.indexOf(e.id as string) === -1);
					this.employees.push(...data.body);
					this.dataSource = new MatTableDataSource(this.employees);
					this._skipUsers += data.body.length;
					this.usersFound = true;
					this._cdr.markForCheck();
				}
			});
	}
}
