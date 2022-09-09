/* tslint:disable */
/* eslint-disable */

/**
 * Department information of departments tree
 */
export interface DepartmentsTreeInfo {
	categoryName?: string;
	children?: Array<DepartmentsTreeInfo>;
	id: string;
	name: string;
	parentId?: string;
}
