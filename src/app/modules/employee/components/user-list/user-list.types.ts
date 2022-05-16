import { UserInfo } from '@api/user-service/models/user-info';
import { UserInfo as FilterUserInfo } from '@api/filter-service/models/user-info';
import { PendingUserInfo } from '@api/user-service/models/pending-user-info';

export type FindUsersBody = UserInfo[] | PendingUserInfo[] | FilterUserInfo[];
export type Status = 'active' | 'archive' | 'pending';
export type UserInfoLike = UserInfo | FilterUserInfo;
