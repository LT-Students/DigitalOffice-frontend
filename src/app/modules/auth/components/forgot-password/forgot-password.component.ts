import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@app/services/user/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CurrentCompanyService } from '@app/services/current-company.service';

@Component({
	selector: 'do-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
	public portalName: Observable<string>;
	public forgotPasswordForm: FormGroup;
	public isWaiting = false;
	public isCompleted = false;

	constructor(
		private userService: UserService,
		private _currentCompanyService: CurrentCompanyService,
		private formBuilder: FormBuilder
	) {
		this.portalName = this._currentCompanyService.company$.pipe(map((company) => company.portalName));
		this.forgotPasswordForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	ngOnInit(): void {}

	public resetPassword() {
		this.isWaiting = true;
		setTimeout(() => {
			this.isCompleted = true;
			this.isWaiting = false;
		}, 1000);
	}

	public isEmailInputValid(): boolean {
		return !(this.forgotPasswordForm.get('email')?.dirty && this.forgotPasswordForm.get('email')?.invalid);
	}
}
