import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';

import { UserService } from '@app/services/user/user.service';
import { AuthenticationRequest } from '@api/auth-service/models/authentication-request';
import { User } from '@app/models/user/user.model';
import { BehaviorSubject, of } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import { RouteType } from '../../../../app-routing.module';

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
	public loginForm: FormGroup;
	public isLoading$$: BehaviorSubject<boolean>;
	public errorMatcher = new LoginErrorMatcher();

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
		private _router: Router,
		private formBuilder: FormBuilder
	) {
		this.isLoading$$ = new BehaviorSubject<boolean>(false);
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	public ngOnInit(): void {
		this.loginForm.valueChanges
			.pipe(
				tap(() => {
					if (this.loginForm) {
						this.loginForm.setErrors(null);
					}
				})
			)
			.subscribe();
	}

	public login(): void {
		this.isLoading$$.next(true);

		const authenticationRequest: AuthenticationRequest = {
			loginData: this.loginForm.get('email')?.value.trim(),
			password: this.loginForm.get('password')?.value,
		};

		this._authService
			.login(authenticationRequest)
			.pipe(
				finalize(() => this.isLoading$$.next(false)),
				catchError((error) => {
					this.loginForm.setErrors({
						login: {
							message: 'Неверный логин или пароль :(',
							error: error,
						},
					});
					return of(null);
				})
			)
			.subscribe((user: User | null) => {
				if (user) {
					this._router.navigate([RouteType.TIME_TRACK]);
				}
			});
	}
}
