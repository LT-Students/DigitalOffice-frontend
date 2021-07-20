import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthenticationResponse } from '@data/api/auth-service/models/authentication-response';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { UserService } from '@app/services/user.service';
import { AuthenticationRequest } from '@data/api/auth-service/models';
import { LocalStorageService } from '@app/services/local-storage.service';
import { CreateCredentialsRequest } from '@data/api/user-service/models/create-credentials-request';
import { throwError } from 'rxjs';

@Component({
	selector: 'do-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
	public userId: string;
	public loginForm: FormGroup;
	public isWaiting = false;
	public get login() {
		return this.loginForm.get('login');
	}

	public get password() {
		return this.loginForm.get('password');
	}

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _fb: FormBuilder
	) {
		this.userId = null;
		this.loginForm = this._fb.group({
			login: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this._activatedRoute.queryParams.subscribe((params: Params) => {
			console.log(params);
			this.userId = params['userId'];
		});
	}

	public signUp(): void {
		this.isWaiting = true;
		const { login, password } = this.loginForm.getRawValue();
		const createCredentialsRequest: CreateCredentialsRequest = { login, password, userId: this.userId };

		this._authService.signUp$(createCredentialsRequest).pipe(
				switchMap((authResponse: AuthenticationResponse) => {
					this.isWaiting = false;
					return this._userService.getUser({ userId: authResponse.userId });
				}),
				catchError((error: string) => {
					console.log(error);
					this.loginForm.setErrors({
						busy: {
							userFriendlyMessage: 'Упс! Возникла ошибка',
							error: error,
						},
					});
					this.isWaiting = false;
					return throwError(error);
				})
			).subscribe(
				(user: UserResponse) => {
					const nextUrl: string = (user.user.isAdmin) ? '/admin/dashboard' : '/user/attendance';
					this._router.navigate([nextUrl]);
				},
				(error: string) => {
					console.log('Getting user info failed.', error);
				}
			);
	}
}
