import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PasswordService } from '@app/services/user/password.service';
import { LoadingState } from '@app/utils/loading-state';
import { AuthRoutes } from '../../models/auth-routes';

@Component({
	selector: 'do-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent extends LoadingState {
	public AuthRoutes = AuthRoutes;

	public forgotPasswordForm: FormGroup;
	public isCompleted$: BehaviorSubject<boolean>;

	constructor(private _passwordService: PasswordService, private _formBuilder: FormBuilder) {
		super();
		this.isCompleted$ = new BehaviorSubject<boolean>(false);

		this.forgotPasswordForm = this._formBuilder.group({
			email: ['', [Validators.required]],
		});
	}

	public resetPassword(): void {
		this.setLoading(true);
		this._passwordService
			.forgotPassword({ userEmail: this.forgotPasswordForm.get('email')?.value.trim() })
			.pipe(
				finalize(() => {
					this.setLoading(false);
				})
			)
			.subscribe({
				next: (res) => {
					this.forgotPasswordForm.patchValue({ email: res.body });
					this.isCompleted$.next(true);
				},
			});
	}
}
