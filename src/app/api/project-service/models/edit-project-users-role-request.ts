/* tslint:disable */
/* eslint-disable */
import { ProjectUserRoleType } from './project-user-role-type';
export interface EditProjectUsersRoleRequest {
	role: ProjectUserRoleType;
	usersIds: Array<string>;
}
