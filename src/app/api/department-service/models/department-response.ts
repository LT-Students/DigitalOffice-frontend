/* tslint:disable */
/* eslint-disable */
import { CategoryInfo } from './category-info';
import { DepartmentUserInfo } from './department-user-info';

/**
 * Full departmant information.
 */
export interface DepartmentResponse {
	category?: CategoryInfo;
	description?: string;
	id: string;
	isActive: boolean;
	name: string;
	parentId?: string;
	shortName: string;
	users?: Array<DepartmentUserInfo>;
}
