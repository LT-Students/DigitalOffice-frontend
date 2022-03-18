/* tslint:disable */
/* eslint-disable */
import { DepartmentUserRole } from './department-user-role';
import { PositionInfo } from './position-info';
import { UserInfo } from './user-info';

/**
 * User data of specific department.
 */
export interface DepartmentUserInfo {
	createdAtUtc?: string;
	isActive?: boolean;
	leftAtUtc?: null | string;
	position?: PositionInfo;
	role?: DepartmentUserRole;
	user?: UserInfo;
}
