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

	private _getInputNumbersValue(): string {
		return this.control.value.replace(/\D/g, '');
	}

	public onPhoneInput(e: Event): void {
		let inputNumbersValue: string = this._getInputNumbersValue();
		let formattedInputValue = '';
		let selectionStart: number | null = (e.target as HTMLInputElement).selectionStart;

		if (!inputNumbersValue) this.control.setValue('');

		if (this.control.value.length !== selectionStart) {
			if (this.control.value.length > 18) {
				this.control.setValue(inputNumbersValue);
			}
			if (/\D/g.test(this.control.value[this.control.value.length - 1])) {
				this.control.setValue(formattedInputValue);
			}
			return;
		}

		if (['7', '8', '9'].includes(inputNumbersValue[0])) {
			if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;
			const firstSymbols = '+7';
			formattedInputValue = firstSymbols + ' ';
			this.control.setValue(firstSymbols + ' ');
			if (inputNumbersValue.length > 1) {
				formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
			}
			if (inputNumbersValue.length >= 5) {
				formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
			}
			if (inputNumbersValue.length >= 8) {
				formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
			}
			if (inputNumbersValue.length >= 10) {
				formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
			}
		} else {
			formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
		}
		this.control.setValue(formattedInputValue);
	}

	public OnPhoneKeyDown(): void {
		if (this._getInputNumbersValue().length === 1) this.control.setValue('');
	}

	public onPhonePaste(e: ClipboardEvent): void {
		const inputNumbersValue: string = this._getInputNumbersValue();
		const pasted: DataTransfer | null = e.clipboardData;
		if (pasted && /\D/g.test(pasted?.getData('text') ?? '')) {
			this.control.setValue(inputNumbersValue);
		}
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
