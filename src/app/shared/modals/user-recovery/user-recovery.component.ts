import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@app/services/user/user.service';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';
import { CommunicationInfo } from '@api/user-service/models/communication-info';

export interface UserRecoveryData {
	userId: string;
	emails: CommunicationInfo[];
}

@Component({
	selector: 'do-user-recovery',
	templateUrl: './user-recovery.component.html',
	styleUrls: ['./user-recovery.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRecoveryComponent implements OnInit {
	public isRecovered = false;

	public isEditMode = false;
	public isEmailAdded = false;
	public isFormValid = false;

	public emails = this.data.emails;
	public newEmail = '';
	public communicationId = '';

	public emailControl = this.fb.control('', [Validators.required, DoValidators.email]);
	public form = this.fb.array(this.data.emails.map(() => this.fb.control(false)));

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: UserRecoveryData,
		private userService: UserService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {}

	public addEditEmail(): void {
		if (this.emailControl.invalid) {
			this.emailControl.markAsTouched();
			return;
		}

		this.newEmail = this.emailControl.value;
		this.isEditMode = false;

		if (!this.isEmailAdded) {
			this.isEmailAdded = true;
			this.form.controls.push(this.fb.control(false));
		}
	}

	public cancelAddEditEmail(): void {
		this.emailControl.reset(this.newEmail);
		this.isEditMode = false;
	}

	public handleChange(index: number): void {
		this.form.controls.forEach((control: AbstractControl, i: number) => {
			if (i !== index) {
				control.setValue(false);
			}
		});

		this.isFormValid = this.form.controls.filter((c: AbstractControl) => c.value).length === 1;
	}

	public recoverUser(): void {
		// this.userService.restoreUser(this.data.userId, this.communicationId);
		this.isRecovered = true;
	}
}
