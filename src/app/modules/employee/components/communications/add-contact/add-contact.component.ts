import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommunicationType, CommunicationVisibleTo } from '@api/user-service/models';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommunicationService } from '@app/services/user/communication.service';
import { finalize } from 'rxjs/operators';
import { parsePhoneNumber } from 'libphonenumber-js';
import { CommunicationTypeModel } from '@app/models/communication.model';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { Subscription } from 'rxjs';

@Component({
	selector: 'do-add-contact',
	templateUrl: './add-contact.component.html',
	styleUrls: ['./add-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddContactComponent extends LoadingState implements OnInit, OnDestroy {
	public readonly Type = CommunicationType;

	public contactTypes = CommunicationTypeModel.getAllTypes();
	public contactForm = this.fb.group({
		type: CommunicationType.Email,
		value: ['', [Validators.required]],
	});

	private subscription!: Subscription;

	private get typeControl(): FormControl {
		return this.contactForm.get('type') as FormControl;
	}

	constructor(
		@Inject(MAT_DIALOG_DATA) public employeeId: string,
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<AddContactComponent>,
		private communicationService: CommunicationService
	) {
		super();
	}

	public ngOnInit(): void {
		this.setValueValidators(this.typeControl.value);

		this.subscription = this.typeControl.valueChanges.subscribe({ next: this.setValueValidators });
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public onClose(result?: OperationResultResponse): void {
		this.dialogRef.close(result);
	}

	public onSubmit(): void {
		if (this.contactForm.invalid) {
			this.contactForm.markAsTouched();
			return;
		}

		this.setLoading(true);

		const type = this.typeControl.value;
		let value: string;
		if (type === CommunicationType.Phone) {
			const phoneNum = parsePhoneNumber(this.contactForm.value);
			value = phoneNum.countryCallingCode.toString() + phoneNum.nationalNumber;
		} else {
			value = this.contactForm.get('value')?.value;
			if (type === CommunicationType.Telegram || type === CommunicationType.Twitter) {
				value = `@${value}`;
			}
		}

		this.communicationService
			.createCommunication({ type, value, userId: this.employeeId, visibleTo: CommunicationVisibleTo.AllUsers })
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe((result) => this.onClose(result));
	}

	private setValueValidators(type: CommunicationType): void {
		const validators = CommunicationTypeModel.getValidatorsByType(type);
		(this.contactForm.get('value') as FormControl).setValidators(validators);
		this.contactForm.updateValueAndValidity();
	}
}
