/* tslint:disable */
/* eslint-disable */
import { UserInfo } from './user-info';

/**
 * Specific department data.
 */
export interface DepartmentInfo {
	countUsers?: number;

	/**
	 * Department description.
	 */
	description?: null | string;
	director?: null | UserInfo;

	/**
	 * Department id.
	 */
	id?: string;

	/**
	 * Department name.
	 */
	name?: string;
}
