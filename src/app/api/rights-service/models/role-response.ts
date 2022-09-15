/* tslint:disable */
/* eslint-disable */
import { RoleInfo } from './role-info';
import { UserInfo } from './user-info';
export interface RoleResponse {
	role: RoleInfo;
	users?: Array<UserInfo>;
}
