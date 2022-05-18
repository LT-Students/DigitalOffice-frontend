import { UserInfo as FilterUserInfo } from '@api/filter-service/models/user-info';
import { UserInfo } from '@api/user-service/models/user-info';
import { UserInfoLike } from './user-list.types';

export function isActiveUser(user: UserInfoLike): user is FilterUserInfo {
	return !('isActive' in user);
}

export function isPendingUser(user: UserInfoLike): user is UserInfo {
	return 'pendingInfo' in user && !!user.pendingInfo;
}
