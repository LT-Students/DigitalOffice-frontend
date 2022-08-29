import { CommunicationType } from '@api/user-service/models/communication-type';
import { ValidatorFn, Validators } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';

export interface IContactType {
	contactName: string;
	type: CommunicationType;
}

export class CommunicationTypeModel {
	private static _types: IContactType[] = [
		{ contactName: 'Email', type: CommunicationType.Email },
		{ contactName: 'Рабочий номер', type: CommunicationType.Phone },
		{ contactName: 'Telegram', type: CommunicationType.Telegram },
		{ contactName: 'Skype', type: CommunicationType.Skype },
		{ contactName: 'Twitter', type: CommunicationType.Twitter },
	];

	public static getContactTypeInfoByType(contactType: CommunicationType | undefined): IContactType | undefined {
		return this._types.find((type: IContactType) => type.type === contactType);
	}

	public static getValidatorsByType(contactType: CommunicationType | undefined): ValidatorFn[] {
		const validators: ValidatorFn[] = [DoValidators.required];

		switch (contactType) {
			case CommunicationType.Email: {
				validators.push(DoValidators.email);
				break;
			}
			case CommunicationType.Phone: {
				validators.push(DoValidators.phone);
				break;
			}
			case CommunicationType.Telegram: {
				validators.push(DoValidators.telegram, DoValidators.matchMaxLength(32), DoValidators.matchMinLength(5));
				break;
			}
			case CommunicationType.Twitter: {
				validators.push(DoValidators.twitter, Validators.maxLength(15), Validators.minLength(1));
				break;
			}
			case CommunicationType.Skype: {
				// temporary we decided to remove all validations for skype except max length
				// validators.push(DoValidators.skype, Validators.maxLength(31), Validators.minLength(5));
				validators.push(DoValidators.matchMaxLength(32));
				break;
			}
			default: {
				break;
			}
		}

		return validators;
	}

	public static getAllTypes(): IContactType[] {
		return this._types.slice();
	}
}
