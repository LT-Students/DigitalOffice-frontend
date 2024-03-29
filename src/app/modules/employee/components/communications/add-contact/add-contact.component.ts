import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommunicationType } from '@api/user-service/models';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommunicationService } from '@app/services/user/communication.service';
import { finalize } from 'rxjs/operators';
import { parsePhoneNumber } from 'libphonenumber-js';
import { CommunicationTypeModel } from '@app/models/communication.model';
import { Subscription } from 'rxjs';
import { LoadingState } from '@app/utils/loading-state';

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

	private get typeControl(): UntypedFormControl {
		return this.contactForm.get('type') as UntypedFormControl;
	}

	private get valueControl(): UntypedFormControl {
		return this.contactForm.get('value') as UntypedFormControl;
	}

	constructor(
		@Inject(DIALOG_DATA) public employeeId: string,
		private fb: UntypedFormBuilder,
		private dialogRef: DialogRef<AddContactComponent>,
		private communicationService: CommunicationService
	) {
		super();
	}

	public ngOnInit(): void {
		this.setValueValidators(this.typeControl.value);

		this.subscription = this.typeControl.valueChanges.subscribe({ next: this.setValueValidators.bind(this) });
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public onClose(result?: any): void {
		this.dialogRef.close(result);
	}

	public onSubmit(): void {
		if (this.contactForm.invalid) {
			this.contactForm.markAsTouched();
			return;
		}

		this.setLoading(true);

		const type = this.typeControl.value as CommunicationType;
		let value: string;
		if (type === CommunicationType.Phone) {
			const phoneNum = parsePhoneNumber(this.valueControl.value);
			value = phoneNum.countryCallingCode.toString() + phoneNum.nationalNumber;
		} else {
			value = this.valueControl.value;
			if (type === CommunicationType.Telegram || type === CommunicationType.Twitter) {
				value = `@${value}`;
			}
		}

		this.communicationService
			.createCommunication({ type, value, userId: this.employeeId })
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe(() => {
				this.onClose({ type, value });
			});
	}

	private setValueValidators(type: CommunicationType): void {
		const validators = CommunicationTypeModel.getValidatorsByType(type);
		this.valueControl.setValidators(validators);
		this.valueControl.updateValueAndValidity();
	}
}
