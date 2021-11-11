import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { CommunicationService } from '@app/services/user/communication.service';
import { IEditCommunicationRequest } from '@app/types/edit-communication-request.interface';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CommunicationType } from '@data/api/user-service/models/communication-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parsePhoneNumber } from 'libphonenumber-js';
import { CommunicationTypeModel } from '@app/models/communication.model';

@Component({
	selector: 'do-edit-contact',
	templateUrl: './edit-contact.component.html',
	styleUrls: ['./edit-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditContactComponent {
	public loading: BehaviorSubject<boolean>;
	public control: FormControl;

	public contactName: string;

	public symbolsCountMap: { [k: string]: string };

	constructor(
		@Inject(MAT_DIALOG_DATA) public dialogData: CommunicationInfo,
		private _matDialogRef: MatDialogRef<EditContactComponent>,
		private _fb: FormBuilder,
		private _communicationService: CommunicationService,
		private _snackBar: MatSnackBar
	) {
		this.symbolsCountMap = {
			one: '# символа',
			other: '# символов',
		};
		this.contactName = CommunicationTypeModel.getContactTypeInfoByType(this.dialogData.type)?.contactName ?? '';
		this.control = this._fb.control(
			this.dialogData.value,
			CommunicationTypeModel.getValidatorsByType(this.dialogData.type)
		);
		this.loading = new BehaviorSubject<boolean>(false);
	}

	public onClose(result?: { response: OperationResultResponse; value: string }): void {
		this._matDialogRef.close(result);
	}

	public onSubmit(): void {
		this.loading.next(true);

		if (this.dialogData.type === 'Phone') {
			const phoneNum = parsePhoneNumber(this.control.value);
			this.control.setValue(phoneNum.countryCallingCode.toString() + phoneNum.nationalNumber);
		}

		const type: CommunicationType = CommunicationType[this.dialogData.type as keyof typeof CommunicationType];

		const request: IEditCommunicationRequest = {
			communicationId: this.dialogData.id ?? '',
			body: [
				{
					op: 'replace',
					path: '/Value',
					value: type === 'Telegram' || type === 'Twitter' ? `@${this.control.value}` : this.control.value,
				},
			],
		};

		this._communicationService
			.editCommunication(request)
			.pipe(
				catchError((err) => {
					const errMessage: string = err.error?.errors ? err.error.errors[0] : 'Что-то пошло не так :(';
					this._snackBar.open(errMessage, 'x', { duration: 3000 });
					return throwError(err);
				}),
				finalize(() => {
					this.loading.next(false);
				})
			)
			.subscribe((result) => {
				this.onClose({ response: result, value: `@${this.control.value}` });
			});
	}
}