/* tslint:disable */
/* eslint-disable */
import { DepartmentUserAssignment } from './department-user-assignment';
import { DepartmentUserRole } from './department-user-role';
import { UserInfo } from './user-info';

/**
 * User data of specific department.
 */
export interface DepartmentUserInfo {
	assignment: DepartmentUserAssignment;
	isActive: boolean;
	role: DepartmentUserRole;
	user: UserInfo;
}
