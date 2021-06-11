import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthenticationResponse } from '@data/api/auth-service/models/authentication-response';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { UserService } from '@app/services/user.service';
import { AuthenticationRequest } from '@data/api/auth-service/models';
import { LocalStorageService } from '@app/services/local-storage.service';

@Component({
	selector: 'do-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
	userId: string;
	loginForm: FormGroup;
	isWaiting = false;

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder
	) {
		this.loginForm = this.formBuilder.group({
			login: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.userId = params['userId'];
		});
	}

	public signUp(): void {
		this.isWaiting = true;
		const { login, password } = this.loginForm.getRawValue();
		this.authService
			.signUp$({
				login: login,
				password: password,
				userId: this.userId,
			})
			.pipe(
				switchMap((authResponse: AuthenticationResponse) => {
					this.isWaiting = false;
					return this.userService.getUser(authResponse.userId);
				}),
				catchError((error) => {
					this.loginForm.setErrors({
						busy: {
							userFriendlyMessage: 'Введённый логин уже занят :(',
							error: error.message,
						},
					});
					this.isWaiting = false;
					throw error;
				})
			)
			.subscribe(
				(user: UserResponse) => {
					if (user.user.isAdmin) {
						this.router.navigate(['/admin/dashboard']);
					} else {
						this.router.navigate(['/user/attendance']);
					}
				},
				(error) => {
					console.log('Getting user info failed.', error.message);
				}
			);
	}

	get login() {
		return this.loginForm.get('login');
	}

	get password() {
		return this.loginForm.get('password');
	}
}
