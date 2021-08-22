/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { DepartmentUserInfo } from './department-user-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectInfo } from './project-info';
export interface OperationResultResponseDepartmentInfo {

	/**
	 * Full departmant information.
	 */
	body?: { 'department'?: DepartmentInfo, 'users'?: Array<DepartmentUserInfo>, 'projects'?: ProjectInfo };
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
