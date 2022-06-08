/* tslint:disable */
/* eslint-disable */
import { DepartmentUserAssignment } from './department-user-assignment';
import { DepartmentUserRole } from './department-user-role';
export interface CreateUserRequest {
	assignment: DepartmentUserAssignment;
	role: DepartmentUserRole;
	userId: string;
}
