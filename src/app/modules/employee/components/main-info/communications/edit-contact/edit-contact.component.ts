import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { CommunicationService } from '@app/services/user/communication.service';
import { IEditCommunicationRequest } from '@app/types/edit-communication-request.interface';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CommunicationType } from '@data/api/user-service/models/communication-type';
import { DoValidators } from '@app/validators/do-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parsePhoneNumber } from 'libphonenumber-js';

@Component({
	selector: 'do-edit-contact',
	templateUrl: './edit-contact.component.html',
	styleUrls: ['./edit-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditContactComponent {
	public loading: BehaviorSubject<boolean>;
	public control: FormControl;

	public viewContactType: string;

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
		this.viewContactType = this.dialogData.type === 'Phone' ? 'Рабочий номер' : this.dialogData.type ?? '';
		this.control = this._initControl();
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

		console.log('REQUEST:', request);

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

	private _initControl(): FormControl {
		let validators: ValidatorFn[] = [Validators.required];

		let initControlValue: string;

		switch (this.dialogData.type) {
			case 'Twitter':
			case 'Telegram': {
				initControlValue = this.dialogData.value?.slice(1) ?? '';
				break;
			}
			case 'Phone': {
				initControlValue = '+' + this.dialogData.value ?? '';
				break;
			}
			default: {
				initControlValue = this.dialogData.value ?? '';
			}
		}

		switch (this.dialogData.type) {
			case CommunicationType.Email: {
				validators.push(DoValidators.email);
				break;
			}
			case CommunicationType.Phone: {
				validators.push(DoValidators.phone);
				break;
			}
			case CommunicationType.Telegram: {
				validators.push(DoValidators.telegram);
				break;
			}
			case CommunicationType.Skype: {
				validators.push(DoValidators.skype);
				break;
			}
			case CommunicationType.Twitter: {
				validators.push(DoValidators.twitter);
				break;
			}
			default:
				break;
		}

		return this._fb.control(initControlValue, validators);
	}
}
