//@ts-nocheck
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';

import { UserService } from '@app/services/user/user.service';
import { AuthenticationRequest } from '@data/api/auth-service/models/authentication-request';
import { User } from '@app/models/user/user.model';
import { of } from 'rxjs';
import { CompanyService } from '@app/services/company/company.service';

@Component({
	selector: 'do-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
	public portalName: string;
	public loginForm: FormGroup;
	public loginError: string;
	public isLoading = false;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
		private _companyService: CompanyService,
		private _router: Router,
		private formBuilder: FormBuilder
	) {
		this.portalName = _companyService.getPortalName();
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
						this.loginError = null;
					}
				})
			)
			.subscribe();
	}

	public login(): void {
		this.isLoading = true;

		const authenticationRequest: AuthenticationRequest = {
			loginData: this.loginForm.get('email').value.trim(),
			password: this.loginForm.get('password').value,
		};

		this._authService
			.login(authenticationRequest)
			.pipe(
				finalize(() => (this.isLoading = false)),
				catchError((error) => {
					this.loginError = error.message;
					this.isLoading = false;
					console.log('Getting user info failed.', error.message);
					return of(null);
				})
			)
			.subscribe((user: User) => {
				this._router.navigate([user.isAdmin ? '/admin/dashboard' : '/user/attendance']);
			});
	}

	public get email() {
		return this.loginForm.get('email');
	}

	public get password() {
		return this.loginForm.get('password');
	}
}
