import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateType } from '@app/types/date.enum';
import { UserStatus } from '@api/user-service/models/user-status';
import { User } from '@app/models/user/user.model';
import { EmployeePageService } from '../../services/employee-page.service';

@Component({
	selector: 'do-edit-workinfo',
	templateUrl: './edit-workinfo.component.html',
	styleUrls: ['./edit-workinfo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditWorkinfoComponent implements OnInit {
	public user: User;
	public EditForm: FormGroup;
	// public _userStatus: UserStatus;
	// public statuses: IUserStatus[];

	constructor(@Inject(MAT_DIALOG_DATA) data: User, private _fb: FormBuilder) {
		this.user = data;
		this.EditForm = this._fb.group({
			department: [this.user.department],
		});
		//  this._userStatus = this.user.status;
		//  this.statuses = UserStatusModel.getAllStatuses();
	}
	ngOnInit(): void {}

	public get department(): FormControl {
		return this.EditForm.get('department')?.value;
	}

	testClick() {
		console.log('click');
	}
}
