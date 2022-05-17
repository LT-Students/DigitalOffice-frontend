import { UserInfo } from '@api/user-service/models/user-info';
import { UserInfo as FilterUserInfo } from '@api/filter-service/models/user-info';

export type Status = 'active' | 'archive' | 'pending';
export type UserInfoLike = UserInfo | FilterUserInfo;

type UpdateAction = 'add' | 'remove';

export class UpdateUsersAction<T extends UserInfoLike[] | string> {
	public action: UpdateAction;

	constructor(public payload: T) {
		this.action = typeof payload === 'string' ? 'remove' : 'add';
	}
}
