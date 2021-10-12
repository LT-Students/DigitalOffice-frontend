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
	private _takeUsers: number;
	private _skipUsers: number;

	constructor(
		private _userService: UserService,
		private _cdr: ChangeDetectorRef,
		private _dialogRef: MatDialogRef<AddEmployeeComponent>,
		@Inject(MAT_DIALOG_DATA) private _data: { idToHide: string[] }
	) {
		this.positions = ['front', 'back', 'manager', 'lead'];
		this.employees = [];
		this._takeUsers = 6;
		this._skipUsers = 0;
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
				if (data.body !== undefined) {
					data.body = data.body.filter((e) => this._data.idToHide.indexOf(e.id as string) === -1);
					this.employees.push(...data.body);
					this._skipUsers += data.body.length;
					this._cdr.markForCheck();
				}
			});
	}

	public onScroll() {
		this.getPageUsers();
	}
}
