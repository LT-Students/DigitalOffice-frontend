/* tslint:disable */
/* eslint-disable */
import { CategoryInfo } from './category-info';
import { UserInfo } from './user-info';

/**
 * Specific department data.
 */
export interface DepartmentInfo {
	category?: CategoryInfo;
	countUsers: number;
	director?: UserInfo;

	/**
	 * Department id.
	 */
	id: string;
	isActive: boolean;

	/**
	 * Department name.
	 */
	name: string;

	/**
	 * Department parentId.
	 */
	parentId?: string;

	/**
	 * Department name.
	 */
	shortName: string;
}
