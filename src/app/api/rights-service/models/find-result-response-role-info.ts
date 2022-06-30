/* tslint:disable */
/* eslint-disable */
import { RoleInfo } from './role-info';
export interface FindResultResponseRoleInfo {
	body?: Array<RoleInfo>;
	errors: Array<string>;

	/**
	 * Total number of all roles.
	 */
	totalCount: number;
}
