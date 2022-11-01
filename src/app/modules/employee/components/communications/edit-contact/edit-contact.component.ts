import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { UntypedFormControl } from '@angular/forms';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { CommunicationType } from '@api/user-service/models/communication-type';
import { parsePhoneNumber } from 'libphonenumber-js';
import { CommunicationTypeModel } from '@app/models/communication.model';
import { CommunicationService } from '@app/services/user/communication.service';
import { finalize } from 'rxjs/operators';
import { LoadingState } from '@app/utils/loading-state';

@Component({
	selector: 'do-edit-contact',
	templateUrl: './edit-contact.component.html',
	styleUrls: ['./edit-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditContactComponent extends LoadingState {
	public readonly Type = CommunicationType;

	public control = new UntypedFormControl(
		this.isTypeStartingWithAt(this.communication.type)
			? this.communication.value.slice(1)
			: this.communication.value,
		CommunicationTypeModel.getValidatorsByType(this.communication.type)
	);
	public contactType = this.communication.type;

	constructor(
		@Inject(DIALOG_DATA) public communication: CommunicationInfo,
		private dialogRef: DialogRef<EditContactComponent>,
		private communicationService: CommunicationService
	) {
		super();
	}

	private isTypeStartingWithAt(t: CommunicationType): boolean {
		return t === CommunicationType.Twitter || t === CommunicationType.Telegram;
	}

	public onClose(result?: any): void {
		this.dialogRef.close(result);
	}

	public onSubmit(): void {
		if (this.control.invalid) {
			this.control.markAsTouched();
			return;
		}
		if (this.control.value === this.communication.value) {
			this.onClose();
			return;
		}

		this.setLoading(true);

		let value: string;
		if (this.contactType === CommunicationType.Phone) {
			const phoneNum = parsePhoneNumber(this.control.value);
			value = phoneNum.countryCallingCode.toString() + phoneNum.nationalNumber;
		} else {
			value = this.control.value;
			if (this.isTypeStartingWithAt(this.contactType)) {
				value = `@${value}`;
			}
		}

		this.communicationService
			.editCommunication({ communicationId: this.communication.id, body: { value } })
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe((result) => this.onClose(result));
	}
}
