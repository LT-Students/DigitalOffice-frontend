import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

import { UserService } from '@app/services/user.service';
import { AuthenticationRequest } from '@data/api/auth-service/models/authentication-request';
import { OperationResultResponseUserResponse } from '@data/api/user-service/models/operation-result-response-user-response';
import { User } from '@app/models/user.model';

@Component({
	selector: 'do-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	public loginForm: FormGroup;
	public loginError: string;
	public isLoading = false;

	constructor(private _authService: AuthService, private _userService: UserService, private _router: Router, private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	public ngOnInit(): void {}

	public login(): void {
		this.isLoading = true;

		const authenticationRequest: AuthenticationRequest = {
			loginData: this.loginForm.get('email').value,
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
					throw error;
				})
			)
			.subscribe((user: User) => {
				this._router.navigate([user.user.isAdmin ? '/admin/dashboard' : '/user/attendance']);
			});
	}

	public get email() {
		return this.loginForm.get('email');
	}

	public get password() {
		return this.loginForm.get('password');
	}
}
