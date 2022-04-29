import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/models/user/user.model';
import { UserStatus } from '@api/user-service/models/user-status';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { DoValidators } from '@app/validators/do-validators';
import { DateType } from '@app/types/date.enum';

@Component({
	selector: 'do-edit-info',
	templateUrl: './edit-info.component.html',
	styleUrls: ['./edit-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInfoComponent implements OnInit {
	public user: User;
	public isEditMode = false;
	public editForm: FormGroup;

	public statuses: IUserStatus[];
	public dateType: typeof DateType = DateType;

	constructor(@Inject(MAT_DIALOG_DATA) data: User, private _fb: FormBuilder) {
		this.user = data;
		this.editForm = this.initForm();
		this.statuses = UserStatusModel.getAllStatuses();
	}

	ngOnInit(): void {}

	private initForm(): FormGroup {
		 return this._fb.group({
			surname: [null, [Validators.required, DoValidators.noWhitespaces, DoValidators.isNameValid]], // [Validators.required, DoValidators.noWhitespaces, DoValidators.isNameValid]
			name: [null, [Validators.required, DoValidators.noWhitespaces, DoValidators.isNameValid]],
			middleName: [null, [DoValidators.noWhitespaces, DoValidators.isNameValid]],
			dateOfBirth: [null],
			location: [null],
			hours: [null],
			status: [null],
			aboutField: [null],
		});
	}

	public onEdit(): void {
		this.isEditMode = !this.isEditMode;
		this.editForm.patchValue({
			surname: this.user.lastName,
			name: this.user.firstName,
			middleName: this.user.middleName,
			dateOfBirth: this.user.dateOfBirth,
			location: null,
			hours: this.user.businessHoursToUtc,
			status: this.user.status,
			aboutField: this.user.about,
		});
	}

	public onSubmit(): void {
		this.user.lastName = this.editForm.get('surname')?.value;
		this.user.firstName = this.editForm.get('name')?.value;
		this.user.middleName = this.editForm.get('middleName')?.value;
		this.user.dateOfBirth = this.editForm.get('dateOfBirth')?.value;
		// this.user.location = this.editForm.get('location')?.value;
		this.user.businessHoursToUtc = this.editForm.get('hours')?.value;
		this.user.status = this.editForm.get('status')?.value as UserStatus;
		this.user.about = this.editForm.get('aboutField')?.value;
		console.log(this.user.status)
		this.isEditMode = !this.isEditMode;
	}

	onClose(): void {
		this.isEditMode = !this.isEditMode;
	}
}
