/* tslint:disable */
/* eslint-disable */
import { ProjectUserRoleType } from './project-user-role-type';
export interface UserRequest {
	role: ProjectUserRoleType;

	/**
	 * Unique user identifier.
	 */
	userId: string;
}
