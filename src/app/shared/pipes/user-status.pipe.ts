import { Pipe, PipeTransform } from '@angular/core';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { UserStatus } from '@api/user-service/models/user-status';

@Pipe({
	name: 'userStatus',
})
export class UserStatusPipe implements PipeTransform {
	transform(userStatus: UserStatus | undefined, emoji: boolean = true, label: boolean = false): string {
		if (!userStatus) return '';
		else {
			const userModel: IUserStatus | undefined = UserStatusModel.getUserStatusInfoByType(userStatus);
			return `${emoji ? userModel?.emojiIcon : ''} ${label ? userModel?.statusInRussian : ''}`;
		}
	}
}
