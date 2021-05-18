// eslint-disable-next-line no-shadow
// TODO: use enum from API

import { UserStatus } from '@data/api/user-service/models/user-status';

export interface IUserStatus {
	emojiIcon: string;
	statusType: UserStatus,
	statusInRussian: string;
}

export class UserStatusModel {

	private static _statuses = [
			{ emojiIcon: '🏖️', statusType: UserStatus.Vacation, statusInRussian: 'в отпуске' },
			{ emojiIcon: '🤧', statusType: UserStatus.Sick, statusInRussian: 'на больничном' },
			{ emojiIcon: '🏢', statusType: UserStatus.WorkFromOffice, statusInRussian: 'работает в офисе' },
			{ emojiIcon: '🏠', statusType: UserStatus.WorkFromHome, statusInRussian: 'работает дома' },
	];

	public static getUserStatusInfoByType(statusType: UserStatus): IUserStatus {
		return this._statuses.find((status: IUserStatus) => status.statusType === statusType);
	}

	public static getAllStatuses(): IUserStatus[] {
		return this._statuses.slice();
	}
}
