import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordRequest } from '@data/api/user-service/models/change-password-request';
import { DoValidators } from '@app/validators/do-validators';
import { PasswordService } from '@app/services/user/password.service';
import { finalize } from 'rxjs/operators';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'do-change-password',
	templateUrl: './change-user-password.component.html',
	styleUrls: ['./change-user-password.component.scss'],
})
export class ChangeUserPasswordComponent {
	public passwordForm: FormGroup;
	public loading$$: BehaviorSubject<boolean>;

	constructor(
		private _fb: FormBuilder,
		private _dialogRef: MatDialogRef<any>,
		private _passwordService: PasswordService
	) {
		this.loading$$ = new BehaviorSubject<boolean>(false);
		this.passwordForm = _fb.group({
			old_password: ['', [Validators.required]],
			new_password: ['', [Validators.required, DoValidators.password]],
		});
	}

	public onChangePasswordSubmit(): void {
		const body: ChangePasswordRequest = {
			newPassword: this.passwordForm.get('new_password')?.value?.trim(),
			password: this.passwordForm.get('old_password')?.value?.trim(),
		};
		this.loading$$.next(true);
		this._passwordService
			.changePassword(body)
			.pipe(finalize(() => this.loading$$.next(false)))
			.subscribe(
				(result: OperationResultResponse) => {
					this._dialogRef.close(result);
				},
				(error: OperationResultResponse | HttpErrorResponse) => {
					throw error;
				}
			);
	}
}