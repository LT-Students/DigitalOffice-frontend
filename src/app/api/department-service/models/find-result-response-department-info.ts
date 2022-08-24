/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
export interface FindResultResponseDepartmentInfo {
	body?: Array<DepartmentInfo>;
	errors: Array<string>;
	totalCount: number;
}
