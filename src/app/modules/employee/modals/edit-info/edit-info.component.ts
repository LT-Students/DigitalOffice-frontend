import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '@app/models/user/user.model';
import { UserStatus } from '@api/user-service/models/user-status';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';

@Component({
	selector: 'do-edit-info',
	templateUrl: './edit-info.component.html',
	styleUrls: ['./edit-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInfoComponent implements OnInit {
	public user: User;
	isEditMode = false;
	public EditForm: FormGroup;
	public _userStatus: UserStatus;
	public statuses: IUserStatus[];
	public dateType: string | undefined;

	constructor(@Inject(MAT_DIALOG_DATA) data: User, private _fb: FormBuilder) {
		this.user = data;
		this.EditForm = this._fb.group({
			surname: [this.user.lastName],
			name: [this.user.firstName],
			middleName: [this.user.middleName],
			dateOfBirth: [this.user.dateOfBirth],
			location: [''],
			hours: [this.user.businessHoursToUtc],
			status: [this.user.status],
			aboutField: [this.user.about],
		});
		this._userStatus = this.user.status;
		this.statuses = UserStatusModel.getAllStatuses();
		this.dateType = this.user.dateOfBirth;
	}

	ngOnInit(): void {}


	onEdit() {
		this.isEditMode = !this.isEditMode;
	}

	public onSubmit() {
		this.EditForm.patchValue({ status: this._userStatus });
	}

	onClose() {
		this.onEdit();
	}

	makeCapital(word: string) {
		return word[0].toUpperCase() + word.substr(1).toLowerCase();
	}
}
