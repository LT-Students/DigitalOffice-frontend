import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';
import { CurrentUserService } from '@app/services/current-user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { AppRoutes } from '@app/models/app-routes';
import { UserService } from '@app/services/user/user.service';
import { LoadingState } from '@app/utils/loading-state';
import { AdminRoutes } from '../../../admin/models/admin-routes';

@Component({
	selector: 'do-reactivate',
	templateUrl: './reactivate.component.html',
	styleUrls: ['./reactivate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactivateComponent extends LoadingState {
	public form = this.fb.group({
		password: ['', Validators.required],
	});

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private _currentUserService: CurrentUserService,
		private activatedRoute: ActivatedRoute,
		private _router: Router,
		private fb: FormBuilder
	) {
		super();
	}

	public reactivate(): void {
		this.setLoading(true);
		this.activatedRoute.queryParams
			.pipe(
				switchMap((params: Params) => {
					const userId = params['userId'];
					const { password } = this.form.getRawValue();

					return this.authService.reactivateUser(userId, password);
				}),
				switchMap(({ body: credentialResponse }) =>
					this._currentUserService.getUserOnLogin(credentialResponse?.userId)
				),
				tap((user: User) => this._currentUserService.setUser(user)),
				catchError((error: string) => {
					this.form.get('password')?.setErrors({
						invalid: {
							error: error,
						},
					});
					return throwError(error);
				})
			)
			.subscribe({
				next: (user: User) => {
					const nextUrl: string[] = user.isAdmin
						? [AppRoutes.Admin, AdminRoutes.Dashboard]
						: [AppRoutes.TimeTrack];
					this._router.navigate(nextUrl, {});
				},
				error: () => this.setLoading(false),
			});
	}
}
