import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@app/services/user/user.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { CommunicationService } from '@app/services/user/communication.service';
import { CommunicationType } from '@api/user-service/models/communication-type';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { HttpErrorResponse } from '@angular/common/http';

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
	public emailForRecovery = '';
	public emailAlreadyExists = new BehaviorSubject<string>('');

	public isEditMode = false;
	public isEmailAdded = false;
	public isFormValid = false;

	public emails = this.data.emails;
	public newEmail = '';

	public emailControl = this.fb.control('', [Validators.required, DoValidators.email]);
	public form = this.fb.array(this.data.emails.map(() => this.fb.control(false)));

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: UserRecoveryData,
		private userService: UserService,
		private communicationService: CommunicationService,
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
		const userId = this.data.userId;
		const index = this.form.controls.findIndex((c: AbstractControl) => c.value);

		(index === this.form.controls.length - 1 && this.emails.length !== 1
			? this.communicationService
					.createCommunication({
						userId: userId,
						type: CommunicationType.Email,
						value: this.newEmail,
					})
					.pipe(
						map((res: OperationResultResponse) => res.body as string),
						catchError((err: HttpErrorResponse) => {
							if (err.error.errors?.some((e: string) => e === 'Communication value already exist.')) {
								this.emailAlreadyExists.next(this.newEmail);
							}
							return throwError(err);
						})
					)
			: of(this.emails[index].id)
		)
			.pipe(
				switchMap((communicationId: string) => {
					return this.userService.restoreUser(userId, communicationId);
				})
			)
			.subscribe({
				next: () => {
					this.emailForRecovery = this.emails?.[index].value ?? this.newEmail;
				},
			});
	}
}
