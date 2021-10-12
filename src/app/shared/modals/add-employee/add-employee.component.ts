import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnInit, Inject } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from '@data/api/user-service/models/user-info';

@Component({
	selector: 'do-modal-add-employee',
	templateUrl: './add-employee.component.html',
	styleUrls: ['./add-employee.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent implements OnInit {
	public positions: string[];
	public employees: UserInfo[];
	public pageSize: number;
	public pageIndex: number;

	constructor(
		private _userService: UserService,
		private _cdr: ChangeDetectorRef,
		public dialogRef: MatDialogRef<AddEmployeeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { idToHide: string[] }
	) {
		this.positions = ['front', 'back', 'manager', 'lead'];
		this.employees = [];
		this.pageSize = 5;
		this.pageIndex = 0;
	}
	public ngOnInit(): void {
		this._getPageUsers();
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	private _getPageUsers(): void {
		this._userService
			.findUsers({
				skipCount: this.pageIndex,
				takeCount: this.pageSize,
				includedepartment: true,
				includeposition: true,
			})
			.subscribe((data) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				data?.body?.forEach((el) => {
					this.employees.push(el);
				}) ?? [];
				this.employees = this.employees.filter((e) => this.data.idToHide.indexOf(e.id as string) === -1);
				console.log(this.employees);
				this.pageIndex += this.employees.length + this.data.idToHide.length;
				this.pageSize += this.employees.length + this.data.idToHide.length;
				this._cdr.markForCheck();
			});
	}

	public onScroll() {
		this._getPageUsers();
	}
}
