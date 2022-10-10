import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
export class ResetPasswordComponent extends LoadingState implements OnInit {
	public AuthRoutes = AuthRoutes;

	public resetForm: FormGroup;
	public isCompleted$: BehaviorSubject<boolean>;
	public passwordErrorMatcher = new PasswordErrorMatcher();
	public loginSecretErrorMatcher = new LoginSecretErrorMatcher();
	public hintValidations$!: Observable<HintValidation[]>;

	constructor(private _fb: FormBuilder, private _passwordService: PasswordService, private _route: ActivatedRoute) {
		super();
		this.resetForm = this._fb.group(
			{
				login: ['', [Validators.required]],
				password: ['', [Validators.required, DoValidators.password]],
				repeatPassword: ['', [Validators.required, DoValidators.password]],
				secret: ['', [Validators.required]],
			},
			{ validators: [DoValidators.matchControls('password', 'repeatPassword')] }
		);
		this.isCompleted$ = new BehaviorSubject<boolean>(false);
	}

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
		this.setLoading(true);
		this._route.queryParams
			.pipe(
				switchMap((params) => {
					const request: ReconstructPasswordRequest = {
						userId: params['userId'],
						login: this.resetForm.get('login')?.value.trim(),
						newPassword: this.resetForm.get('password')?.value,
						secret: this.resetForm.get('secret')?.value,
					};
					return this._passwordService.reconstructPassword(request);
				}),
				finalize(() => this.setLoading(false)),
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
