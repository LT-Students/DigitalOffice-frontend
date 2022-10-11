import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {
	UntypedFormBuilder,
	UntypedFormControl,
	UntypedFormGroup,
	FormGroupDirective,
	NgForm,
	Validators,
} from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';

import { AuthenticationRequest } from '@api/auth-service/models/authentication-request';
import { throwError } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import { AppRoutes } from '@app/models/app-routes';
import { AutofillEvent } from '@angular/cdk/text-field';
import { LoadingState } from '@app/utils/loading-state';
import { AuthRoutes } from '../../models/auth-routes';

class LoginErrorMatcher implements ErrorStateMatcher {
	isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return !!form?.hasError('login');
	}
}

@Component({
	selector: 'do-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: ErrorStateMatcher, useClass: LoginErrorMatcher }],
})
export class LoginComponent extends LoadingState implements OnInit {
	public AuthRoutes = AuthRoutes;

	public loginForm: UntypedFormGroup;

	constructor(
		private authService: AuthService,
		private router: Router,
		private formBuilder: UntypedFormBuilder,
		private route: ActivatedRoute
	) {
		super();
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	public ngOnInit(): void {}

	public handleAutofill(autofill: AutofillEvent): void {
		if (autofill.isAutofilled) {
			this.loginForm.get('username')?.setErrors(null);
			this.loginForm.get('password')?.setErrors(null);
		}
	}

	public login(): void {
		this.setLoading(true);

		const authenticationRequest: AuthenticationRequest = {
			loginData: this.loginForm.get('username')?.value.trim(),
			password: this.loginForm.get('password')?.value,
		};

		this.authService
			.login(authenticationRequest)
			.pipe(
				catchError((error) => {
					this.setLoading(false);
					this.loginForm.setErrors({
						login: {
							message: 'Неверный логин или пароль :(',
							error: error,
						},
					});
					return throwError(error);
				})
			)
			.subscribe({
				next: () => {
					const returnUrl = this.route.snapshot.queryParamMap.get('return');
					if (returnUrl) {
						this.router.navigateByUrl(returnUrl);
					} else {
						this.router.navigate([AppRoutes.TimeTrack]);
					}
				},
			});
	}
}
