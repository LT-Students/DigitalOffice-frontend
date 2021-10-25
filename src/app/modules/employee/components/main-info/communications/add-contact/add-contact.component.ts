import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommunicationType, CreateCommunicationRequest, OperationResultResponse } from '@data/api/user-service/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommunicationService } from '@app/services/user/communication.service';
import { EmployeePageService } from '@app/services/employee-page.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core';
import { DoValidators } from '@app/validators/do-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parsePhoneNumber } from 'libphonenumber-js';

@Component({
	selector: 'do-add-contact',
	templateUrl: './add-contact.component.html',
	styleUrls: ['./add-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddContactComponent {
	public loading: BehaviorSubject<boolean>;
	public contactTypes: { viewTypeValue: string; type: CommunicationType }[];
	public viewSelectedType: string;

	public contactForm: FormGroup;

	public symbolsCountMap: { [k: string]: string };

	constructor(
		@Inject(MAT_DIALOG_DATA) public employeeId: string,
		private _fb: FormBuilder,
		private _dialogRef: MatDialogRef<AddContactComponent>,
		private _communicationService: CommunicationService,
		private _employeePageService: EmployeePageService,
		private _snackBar: MatSnackBar
	) {
		this.symbolsCountMap = {
			one: '# символа',
			other: '# символов',
		};
		this.loading = new BehaviorSubject<boolean>(false);
		this.viewSelectedType = 'Email';
		this.contactTypes = [
			{ viewTypeValue: 'Email', type: CommunicationType.Email },
			{ viewTypeValue: 'Рабочий номер', type: CommunicationType.Phone },
			{ viewTypeValue: 'Telegram', type: CommunicationType.Telegram },
			{ viewTypeValue: 'Skype', type: CommunicationType.Skype },
			{ viewTypeValue: 'Twitter', type: CommunicationType.Twitter },
		];
		this.contactForm = this._fb.group({
			type: this.contactTypes[0].type,
			value: ['', [Validators.required]],
		});
	}

	public onTypeChange(type: CommunicationType, event: MatOptionSelectionChange): void {
		if (event.source.selected) {
			this._setValueValidators(type);
			this.viewSelectedType = this.contactTypes.find((cntcType) => cntcType.type === type)?.viewTypeValue ?? '';
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
					const errorMessage: string = err.error.errors ? err.error.errors[0] : 'Что-то пошло не так :(';
					this._snackBar.open(errorMessage, '×', { duration: 3000 });
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

		this.contactForm.get('value')?.addValidators(Validators.required);

		switch (type) {
			case CommunicationType.Email: {
				this.contactForm.get('value')?.addValidators(DoValidators.email);
				break;
			}
			case CommunicationType.Phone: {
				this.contactForm.get('value')?.addValidators(DoValidators.phone);
				break;
			}
			case CommunicationType.Telegram: {
				this.contactForm.get('value')?.addValidators(DoValidators.telegram);
				break;
			}
			case CommunicationType.Skype: {
				this.contactForm.get('value')?.addValidators(DoValidators.skype);
				break;
			}
			case CommunicationType.Twitter: {
				this.contactForm.get('value')?.addValidators(DoValidators.twitter);
				break;
			}
			default:
				break;
		}

		this.contactForm.updateValueAndValidity();
	}
}
