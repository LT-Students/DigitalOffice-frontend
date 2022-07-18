import { Pipe, PipeTransform } from '@angular/core';
import { CommunicationType } from '@api/user-service/models/communication-type';

@Pipe({
	name: 'communicationType',
})
export class CommunicationTypePipe implements PipeTransform {
	private typeMap = {
		[CommunicationType.BaseEmail]: 'E-mail',
		[CommunicationType.Email]: 'E-mail',
		[CommunicationType.Phone]: 'Рабочий номер',
		[CommunicationType.Skype]: 'Skype',
		[CommunicationType.Telegram]: 'Telegram',
		[CommunicationType.Twitter]: 'Twitter',
	};

	transform(type: CommunicationType): string {
		return this.typeMap[type];
	}
}
