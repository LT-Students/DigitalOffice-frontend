import { Component, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { UntypedFormBuilder, UntypedFormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { ChangePasswordRequest } from '@api/user-service/models/change-password-request';
import { DoValidators } from '@app/validators/do-validators';
import { PasswordService } from '@app/services/user/password.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { LoadingState } from '@app/utils/loading-state';
import { HintValidation } from '@shared/component/validation-hint/validation-hint.component';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
	public isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return !!(control?.dirty || control?.touched) && !!form?.hasError('noMatch');
	}
}

@Component({
	selector: 'do-change-password',
	templateUrl: './change-user-password.component.html',
	styleUrls: ['./change-user-password.component.scss'],
})
export class ChangeUserPasswordComponent implements OnInit {
	public form = this.fb.group(
		{
			oldPassword: ['', [DoValidators.required]],
			newPassword: ['', [DoValidators.required, DoValidators.password]],
			confirmPassword: ['', [DoValidators.required, DoValidators.password]],
		},
		{ validators: DoValidators.matchControls('newPassword', 'confirmPassword') }
	);
	public errorMatcher = new CrossFieldErrorMatcher();
	public loadingState = new LoadingState();
	public hintValidations$!: Observable<HintValidation[]>;

	constructor(
		private fb: UntypedFormBuilder,
		private dialogRef: DialogRef,
		private passwordService: PasswordService
	) {}

	public ngOnInit(): void {
		this.hintValidations$ = (this.form.get('newPassword') as UntypedFormControl).valueChanges.pipe(
			startWith(''),
			map((value: string) => [
				{ label: 'от 8 до 50 символов', valid: value.length >= 8 && value.length <= 50 },
				{ label: 'заглавные буквы', valid: /[A-Z]/u.test(value) },
				{ label: 'строчные буквы', valid: /[a-z]/u.test(value) },
				{ label: 'минимум 1 цифра', valid: /\d/.test(value) },
				{ label: 'минимум 1 специальный символ', valid: /[.,:;?!*+%\-<>@\[\]{}/\\_$#]/.test(value) },
				{ label: 'нельзя использовать пробел', valid: !!value && !/\s/.test(value) },
				{ label: 'только латинские буквы', valid: !!value && !/(?=\p{L})(?![a-zA-Z])/u.test(value) },
			])
		);
	}

	public changePassword(): void {
		const body: ChangePasswordRequest = {
			password: this.form.get('oldPassword')?.value,
			newPassword: this.form.get('newPassword')?.value,
		};
		this.loadingState.setLoading(true);
		this.passwordService
			.changePassword(body)
			.pipe(finalize(() => this.loadingState.setLoading(false)))
			.subscribe((result: OperationResultResponse) => {
				this.dialogRef.close(result);
			});
	}
}
