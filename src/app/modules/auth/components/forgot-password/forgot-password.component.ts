import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { DoValidators } from '@app/validators/do-validators';
import { CredentialsService } from '@app/services/user/credentials.service';
import { finalize } from 'rxjs/operators';

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

	constructor(private _credentialService: CredentialsService, private _formBuilder: FormBuilder) {
		this.isWaiting$$ = new BehaviorSubject<boolean>(false);
		this.isCompleted$$ = new BehaviorSubject<boolean>(false);

		this.forgotPasswordForm = this._formBuilder.group({
			email: ['', [Validators.required, DoValidators.email]],
		});
	}

	public resetPassword(): void {
		this.isWaiting$$.next(true);
		this._credentialService
			.forgotPassword({ userEmail: this.forgotPasswordForm.get('email')?.value.trim() })
			.pipe(
				finalize(() => {
					this.isWaiting$$.next(false);
				})
			)
			.subscribe({ next: () => this.isCompleted$$.next(true) });
	}
}
