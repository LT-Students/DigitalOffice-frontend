/* tslint:disable */
/* eslint-disable */
import { DepartmentUserAssignment } from './department-user-assignment';
import { DepartmentUserRole } from './department-user-role';

/**
 * User data of specific department.
 */
export interface DepartmentUserInfo {
	assignment: DepartmentUserAssignment;
	role: DepartmentUserRole;
	userId: string;
}
