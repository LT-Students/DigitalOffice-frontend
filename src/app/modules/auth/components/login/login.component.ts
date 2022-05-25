import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';

import { AuthenticationRequest } from '@api/auth-service/models/authentication-request';
import { User } from '@app/models/user/user.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import { AppRoutes } from '@app/models/app-routes';
import { AutofillEvent } from '@angular/cdk/text-field';
import { AuthRoutes } from '../../models/auth-routes';

class LoginErrorMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
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
export class LoginComponent implements OnInit {
	public AuthRoutes = AuthRoutes;

	public loginForm: FormGroup;
	public isLoading$$: BehaviorSubject<boolean>;

	constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
		this.isLoading$$ = new BehaviorSubject<boolean>(false);
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
		this.isLoading$$.next(true);

		const authenticationRequest: AuthenticationRequest = {
			loginData: this.loginForm.get('username')?.value.trim(),
			password: this.loginForm.get('password')?.value,
		};

		this.authService
			.login(authenticationRequest)
			.pipe(
				catchError((error) => {
					this.isLoading$$.next(false);
					this.loginForm.setErrors({
						login: {
							message: 'Неверный логин или пароль :(',
							error: error,
						},
					});
					return throwError(error);
				})
			)
			.subscribe((user: User) => {
				if (user) {
					this.router.navigate([AppRoutes.TimeTrack]);
				}
			});
	}
}
