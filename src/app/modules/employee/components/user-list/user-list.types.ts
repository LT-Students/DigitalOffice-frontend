import { UserInfo } from '@api/user-service/models/user-info';
import { UserInfo as FilterUserInfo } from '@api/filter-service/models/user-info';

export type Status = 'active' | 'archive' | 'pending';
export type UserInfoLike = UserInfo | FilterUserInfo;

type UpdateAction = 'add' | 'edit' | 'remove';

export interface EditPayload {
	userId: string;
	partialUser: Partial<UserInfoLike>;
}
export type UpdateUsersPayload = UserInfoLike[] | EditPayload | string;

export class UpdateUsersAction<T extends UpdateUsersPayload> {
	public action: UpdateAction;

	constructor(public payload: T) {
		if (Array.isArray(payload)) {
			this.action = 'add';
		} else {
			this.action = typeof payload === 'string' ? 'remove' : 'edit';
		}
	}
}
