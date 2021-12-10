import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangePasswordRequest } from '@data/api/user-service/models/change-password-request';
import { DoValidators } from '@app/validators/do-validators';
import { PasswordService } from '@app/services/user/password.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessageModel } from '@app/models/response/response-message.model';

@Component({
	selector: 'do-change-password',
	templateUrl: './change-user-password.component.html',
	styleUrls: ['./change-user-password.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ChangeUserPasswordComponent implements OnDestroy {
	public passwordForm: FormGroup;
	private _unsubscribe$: Subject<void>;
	public loading$$: BehaviorSubject<boolean>;

	constructor(
		private _fb: FormBuilder,
		private _dialogRef: MatDialogRef<any>,
		private _passwordService: PasswordService,
		private _responseMessage: ResponseMessageModel,
		@Inject(MAT_DIALOG_DATA) public userId: string | undefined
	) {
		this._unsubscribe$ = new Subject<void>();
		this.loading$$ = new BehaviorSubject<boolean>(false);
		this.passwordForm = _fb.group({
			old_password: ['', [Validators.required]],
			new_password: ['', [Validators.required, DoValidators.password]],
		});
	}

	public ngOnDestroy(): void {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	public changePassword(body: ChangePasswordRequest) {
		return this._passwordService.changePassword(body);
	}

	public onChangePasswordSubmit() {
		const body: ChangePasswordRequest = {
			newPassword: this.passwordForm.get('new_password')?.value?.trim(),
			password: this.passwordForm.get('old_password')?.value?.trim(),
			userId: this.userId,
		};
		this.loading$$.next(true);
		this._passwordService
			.changePassword(body)
			.pipe(finalize(() => this.loading$$.next(false)))
			.subscribe(
				(result: OperationResultResponse) => {
					this._dialogRef.close(result);
				},
				(error: OperationResultResponse | HttpErrorResponse) => {
					throw error;
				}
			);
	}
}
