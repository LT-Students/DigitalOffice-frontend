import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { CreateCredentialsRequest } from '@data/api/user-service/models/create-credentials-request';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { CompanyService } from '@app/services/company/company.service';
import { CurrentUserService } from '@app/services/current-user.service';

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
	public isWaiting: BehaviorSubject<boolean>;
	public get login() {
		return this.loginForm.get('login');
	}

	public get password() {
		return this.loginForm.get('password');
	}

	constructor(
		private _authService: AuthService,
		private _currentUserService: CurrentUserService,
		private _companyService: CompanyService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _fb: FormBuilder
	) {
		this.isWaiting = new BehaviorSubject<boolean>(false);
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
		this.isWaiting.next(true);
		const { login, password } = this.loginForm.getRawValue();
		const createCredentialsRequest: CreateCredentialsRequest = { login, password, userId: this.userId };

		this._authService
			.signUp$(createCredentialsRequest)
			.pipe(
				switchMap(({ body: credentialResponse }) =>
					this._currentUserService.getUserOnLogin(credentialResponse?.userId)
				),
				tap(this._currentUserService.setUser),
				catchError((error: string) => {
					console.log(error);
					this.loginForm.setErrors({
						busy: {
							userFriendlyMessage: 'Упс! Возникла ошибка',
							error: error,
						},
					});
					return throwError(error);
				}),
				finalize(() => this.isWaiting.next(false))
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
