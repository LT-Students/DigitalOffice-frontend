import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommunicationType, CreateCommunicationRequest, OperationResultResponse } from '@data/api/user-service/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommunicationService } from '@app/services/user/communication.service';
import { EmployeePageService } from '@app/services/employee-page.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core';
import { parsePhoneNumber } from 'libphonenumber-js';
import { CommunicationTypeModel, IContactType } from '@app/models/communication.model';

@Component({
	selector: 'do-add-contact',
	templateUrl: './add-contact.component.html',
	styleUrls: ['./add-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddContactComponent {
	public loading: BehaviorSubject<boolean>;
	public contactTypes: IContactType[];
	public contactName: string;

	public contactForm: FormGroup;

	public symbolsCountMap: { [k: string]: string };

	constructor(
		@Inject(MAT_DIALOG_DATA) public employeeId: string,
		private _fb: FormBuilder,
		private _dialogRef: MatDialogRef<AddContactComponent>,
		private _communicationService: CommunicationService,
		private _employeePageService: EmployeePageService
	) {
		this.symbolsCountMap = {
			one: '# символа',
			other: '# символов',
		};
		this.loading = new BehaviorSubject<boolean>(false);
		this.contactTypes = CommunicationTypeModel.getAllTypes();
		this.contactName =
			CommunicationTypeModel.getContactTypeInfoByType(this.contactTypes[0].type)?.contactName ?? '';
		this.contactForm = this._fb.group({
			type: this.contactTypes[0].type,
			value: ['', [Validators.required]],
		});
	}

	public onTypeChange(type: CommunicationType, event: MatOptionSelectionChange): void {
		if (event.source.selected) {
			this._setValueValidators(type);
			this.contactName = CommunicationTypeModel.getContactTypeInfoByType(type)?.contactName ?? '';
		}
	}

	public onClose(result?: OperationResultResponse): void {
		this._dialogRef.close(result);
	}

	public onSubmit(): void {
		this.loading.next(true);

		if (this.contactForm.get('type')?.value === 'Phone') {
			const phoneNum = parsePhoneNumber(this.contactForm.get('value')?.value);
			this.contactForm.get('value')?.setValue(phoneNum.countryCallingCode.toString() + phoneNum.nationalNumber);
		}

		const type: CommunicationType =
			CommunicationType[this.contactForm.controls['type'].value as keyof typeof CommunicationType];

		const request: CreateCommunicationRequest = {
			type,
			value:
				type === 'Twitter' || type === 'Telegram'
					? `@${this.contactForm.get('value')?.value}`
					: this.contactForm.get('value')?.value,
			userId: this.employeeId,
		};

		this._communicationService
			.createCommunication(request)
			.pipe(
				catchError((err) => {
					return throwError(err);
				}),
				finalize(() => {
					this.loading.next(false);
				})
			)
			.subscribe((result) => {
				this.onClose(result);
			});
	}

	private _setValueValidators(type: CommunicationType): void {
		this.contactForm.get('value')?.clearValidators();
		this.contactForm.get('value')?.addValidators(CommunicationTypeModel.getValidatorsByType(type));
		this.contactForm.updateValueAndValidity();
	}
}
