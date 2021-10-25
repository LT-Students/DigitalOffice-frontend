import { CommunicationType } from '@data/api/user-service/models/communication-type';
import { ValidatorFn, Validators } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';

export interface IContactType {
	viewTypeValue: string;
	type: CommunicationType;
}

export class CommunicationTypeModel {
	private static _types: IContactType[] = [
		{ viewTypeValue: 'Email', type: CommunicationType.Email },
		{ viewTypeValue: 'Рабочий номер', type: CommunicationType.Phone },
		{ viewTypeValue: 'Telegram', type: CommunicationType.Telegram },
		{ viewTypeValue: 'Skype', type: CommunicationType.Skype },
		{ viewTypeValue: 'Twitter', type: CommunicationType.Twitter },
	];

	public static getContactTypeInfoByType(contactType: CommunicationType | undefined): IContactType | undefined {
		return this._types.find((type: IContactType) => type.type === contactType);
	}

	public static getValidatorsByType(contactType: CommunicationType | undefined): ValidatorFn[] {
		const validators: ValidatorFn[] = [Validators.required];

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
				validators.push(DoValidators.telegram, Validators.maxLength(32), Validators.minLength(5));
				break;
			}
			case CommunicationType.Twitter: {
				validators.push(DoValidators.twitter, Validators.maxLength(15), Validators.minLength(1));
				break;
			}
			case CommunicationType.Skype: {
				validators.push(DoValidators.skype, Validators.maxLength(31), Validators.minLength(5));
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
