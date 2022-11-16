import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, startWith, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from '@app/services/user/password.service';
import { ReconstructPasswordRequest } from '@api/user-service/models/reconstruct-password-request';
import { DoValidators } from '@app/validators/do-validators';
import { ErrorStateMatcher } from '@angular/material/core';
import { HintValidation } from '@shared/component/validation-hint/validation-hint.component';
import { LoadingState } from '@app/utils/loading-state';
import { AuthRoutes } from '../../models/auth-routes';

class PasswordErrorMatcher extends ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return super.isErrorState(control, form) || !!form?.hasError('noMatch');
	}
}

class LoginSecretErrorMatcher extends ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return super.isErrorState(control, form) || !!form?.hasError('invalidLoginSecret');
	}
}

@Component({
	selector: 'do-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
	public readonly AuthRoutes = AuthRoutes;

	public resetForm = this.fb.nonNullable.group(
		{
			password: ['', [DoValidators.required, DoValidators.password]],
			repeatPassword: ['', [DoValidators.required, DoValidators.password]],
			secret: ['', [DoValidators.required]],
		},
		{ validators: [DoValidators.matchControls('password', 'repeatPassword')] }
	);

	public isCompleted$ = new BehaviorSubject<boolean>(false);
	public passwordErrorMatcher = new PasswordErrorMatcher();
	public loginSecretErrorMatcher = new LoginSecretErrorMatcher();
	public hintValidations$!: Observable<HintValidation[]>;
	public loadingState = new LoadingState();

	constructor(private fb: FormBuilder, private passwordService: PasswordService, private route: ActivatedRoute) {}

	public ngOnInit(): void {
		this.hintValidations$ = (this.resetForm.get('password') as FormControl).valueChanges.pipe(
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

	public resetPassword(): void {
		this.loadingState.setLoading(true);
		this.route.queryParams
			.pipe(
				switchMap((params) => {
					const request: ReconstructPasswordRequest = {
						userId: params['userId'],
						newPassword: this.resetForm.controls.password.value,
						secret: this.resetForm.controls.secret.value,
					};
					return this.passwordService.reconstructPassword(request);
				}),
				finalize(() => this.loadingState.setLoading(false)),
				catchError((error) => {
					this.resetForm.setErrors({
						invalidLoginSecret: {
							error: error,
						},
					});
					return throwError(error);
				})
			)
			.subscribe({
				next: (res) => {
					if (res !== null) {
						this.isCompleted$.next(true);
					}
				},
			});
	}
}
