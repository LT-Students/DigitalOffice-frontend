import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CredentialsService } from '@app/services/user/credentials.service';
import { ChangePasswordRequest } from '@data/api/user-service/models/change-password-request';
import { finalize, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'do-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
	public resetForm: FormGroup;
	public isLoading: BehaviorSubject<boolean>;
	public isCompleted: BehaviorSubject<boolean>;

	constructor(
		private _fb: FormBuilder,
		private _credentialsService: CredentialsService,
		private _route: ActivatedRoute
	) {
		this.resetForm = this._fb.group({
			login: ['', Validators.required],
			password: ['', Validators.required],
			secret: ['', Validators.required],
		});
		this.isLoading = new BehaviorSubject<boolean>(false);
		this.isCompleted = new BehaviorSubject<boolean>(false);
	}

	public resetPassword(): void {
		this.isLoading.next(true);
		this._route.queryParamMap
			.pipe(
				switchMap((params) => {
					const request: ChangePasswordRequest = {
						userId: params.get('userId') ?? undefined,
						login: this.resetForm.get('login')?.value.trim(),
						newPassword: this.resetForm.get('password')?.value,
						secret: this.resetForm.get('secret')?.value,
					};
					return this._credentialsService.changePassword(request);
				}),
				finalize(() => this.isLoading.next(false))
			)
			.subscribe({
				next: () => {
					this.isCompleted.next(true);
				},
			});
	}
}
