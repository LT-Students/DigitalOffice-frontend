import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PasswordService } from '@app/services/user/password.service';

@Component({
	selector: 'do-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
	public forgotPasswordForm: FormGroup;
	public isWaiting$$: BehaviorSubject<boolean>;
	public isCompleted$$: BehaviorSubject<boolean>;

	constructor(private _passwordService: PasswordService, private _formBuilder: FormBuilder) {
		this.isWaiting$$ = new BehaviorSubject<boolean>(false);
		this.isCompleted$$ = new BehaviorSubject<boolean>(false);

		this.forgotPasswordForm = this._formBuilder.group({
			email: ['', [Validators.required]],
		});
	}

	public resetPassword(): void {
		this.isWaiting$$.next(true);
		this._passwordService
			.forgotPassword({ userEmail: this.forgotPasswordForm.get('email')?.value.trim() })
			.pipe(
				finalize(() => {
					this.isWaiting$$.next(false);
				})
			)
			.subscribe({ next: () => this.isCompleted$$.next(true) });
	}
}
