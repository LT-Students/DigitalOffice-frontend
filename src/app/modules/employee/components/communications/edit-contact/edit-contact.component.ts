import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { CommunicationType } from '@api/user-service/models/communication-type';
import { parsePhoneNumber } from 'libphonenumber-js';
import { CommunicationTypeModel } from '@app/models/communication.model';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { CommunicationService } from '@app/services/user/communication.service';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'do-edit-contact',
	templateUrl: './edit-contact.component.html',
	styleUrls: ['./edit-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditContactComponent extends LoadingState {
	public readonly Type = CommunicationType;

	public control = new FormControl(
		this.communication.value,
		CommunicationTypeModel.getValidatorsByType(this.communication.type)
	);
	public contactType = this.communication.type;

	constructor(
		@Inject(MAT_DIALOG_DATA) public communication: CommunicationInfo,
		private dialogRef: MatDialogRef<EditContactComponent>,
		private communicationService: CommunicationService
	) {
		super();
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
			if (this.contactType === CommunicationType.Telegram || this.contactType === CommunicationType.Twitter) {
				value = `@${value}`;
			}
		}

		this.communicationService
			.editCommunication({ communicationId: this.communication.id, body: { value } })
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe((result) => this.onClose(result));
	}
}
