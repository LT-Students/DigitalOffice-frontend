import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';
import { catchError, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { CreateCredentialsRequest } from '@api/user-service/models/create-credentials-request';
import { Observable, throwError } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { AppRoutes } from '@app/models/app-routes';
import { HttpErrorResponse } from '@angular/common/http';
import { HintValidation } from '@shared/component/validation-hint/validation-hint.component';
import { LoadingState } from '@app/utils/loading-state';

@Component({
	selector: 'do-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent extends LoadingState implements OnInit {
	public loginForm = this.fb.group({
		login: ['', Validators.required],
		password: ['', Validators.required],
	});
	public hintValidations$!: Observable<HintValidation[]>;

	constructor(
		private authService: AuthService,
		private currentUserService: CurrentUserService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder
	) {
		super();
	}

	public ngOnInit(): void {
		this.hintValidations$ = (this.loginForm.get('login') as FormControl).valueChanges.pipe(
			startWith(''),
			map((value: string) => [
				{ label: 'не менее 5 символов', valid: value.length >= 5 },
				{ label: 'не более 15 символов', valid: !!value && value.length <= 15 },
				{
					label: 'латинские буквы',
					valid: !!value && !/(?=\p{L})(?![a-zA-Z])/u.test(value) && /[a-zA-Z]/.test(value),
				},
				{ label: 'допускаются цифры' },
			]),
			tap((validations: HintValidation[]) => {
				const invalid = validations.some((v: HintValidation) => v.valid != null && !v.valid);
				if (invalid) {
					this.loginForm.get('login')?.setErrors({ invalidLogin: true });
				}
			})
		);
	}

	public signUp(): void {
		this.setLoading(true);
		this.activatedRoute.queryParams
			.pipe(
				switchMap((params: Params) => {
					const { login, password } = this.loginForm.getRawValue();
					const createCredentialsRequest: CreateCredentialsRequest = {
						login: login.trim(),
						password,
						userId: params['userId'],
					};

					return this.authService.signUp$(createCredentialsRequest);
				}),
				switchMap(({ body: credentialResponse }) =>
					this.currentUserService.getUserOnLogin(credentialResponse?.userId)
				),
				tap((user) => this.currentUserService.setUser(user)),
				catchError((error: HttpErrorResponse) => {
					if (error.error.errors.includes('The login already exist.')) {
						this.loginForm.get('login')?.setErrors({
							loginExists: {
								message: 'Такой логин уже существует',
							},
						});
					}
					return throwError(error);
				}),
				finalize(() => this.setLoading(false))
			)
			.subscribe({
				next: (user: User) => {
					const nextUrl: string = user.isAdmin ? '/admin/dashboard' : AppRoutes.TimeTrack;
					this.router.navigate([nextUrl]);
				},
			});
	}
}
