import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { CreateCredentialsRequest } from '@api/user-service/models/create-credentials-request';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { AppRoutes } from '@app/models/app-routes';

@Component({
	selector: 'do-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
	public loginForm: FormGroup;
	public isWaiting$: BehaviorSubject<boolean>;
	public isFormVisible = false;

	constructor(
		private _authService: AuthService,
		private _currentUserService: CurrentUserService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _fb: FormBuilder
	) {
		this.isWaiting$ = new BehaviorSubject<boolean>(false);
		this.loginForm = this._fb.group({
			login: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	public signUp(): void {
		this.isWaiting$.next(true);
		this._activatedRoute.queryParams
			.pipe(
				switchMap((params: Params) => {
					const { login, password } = this.loginForm.getRawValue();
					const createCredentialsRequest: CreateCredentialsRequest = {
						login: login.trim(),
						password,
						userId: params['userId'],
					};

					return this._authService.signUp$(createCredentialsRequest);
				}),
				switchMap(({ body: credentialResponse }) =>
					this._currentUserService.getUserOnLogin(credentialResponse?.userId)
				),
				tap((user) => this._currentUserService.setUser(user)),
				catchError((error: string) => {
					this.loginForm.get('login')?.setErrors({
						loginExists: {
							error: error,
						},
					});
					return throwError(error);
				}),
				finalize(() => this.isWaiting$.next(false))
			)
			.subscribe({
				next: (user: User) => {
					const nextUrl: string = user.isAdmin ? '/admin/dashboard' : AppRoutes.TimeTrack;
					this._router.navigate([nextUrl]);
				},
			});
	}
}
