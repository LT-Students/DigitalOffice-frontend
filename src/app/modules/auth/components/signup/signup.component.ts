import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationResponse } from '@data/api/auth-service/models/authentication-response';
import { UserService } from '@app/services/user/user.service';
import { CreateCredentialsRequest } from '@data/api/user-service/models/create-credentials-request';
import { throwError } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { CompanyService } from '@app/services/company/company.service';

@Component({
	selector: 'do-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
	public portalName: string;
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
		private _companyService: CompanyService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _fb: FormBuilder
	) {
		this.portalName = this._companyService.getPortalName();
		this.userId = '';
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

		this._authService
			.signUp$(createCredentialsRequest)
			.pipe(
				switchMap(({ body: credentialResponse }) => {
					this.isWaiting = false;
					return this._userService.getUserSetCredentials(credentialResponse?.userId);
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
			)
			.subscribe({
				next: (user: User) => {
					const nextUrl: string = user.isAdmin ? '/admin/dashboard' : '/user/attendance';
					console.log(user.getFullName);
					this._router.navigate([nextUrl]);
				},
			});
	}
}
