/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { DepartmentUserInfo } from './department-user-info';
import { NewsInfo } from './news-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectInfo } from './project-info';

export interface OperationResultResponseDepartmentResponse {
	/**
	 * Full department information.
	 */
	body?: {
		department?: DepartmentInfo;
		users?: Array<DepartmentUserInfo>;
		projects?: Array<ProjectInfo>;
		news?: Array<NewsInfo>;
	};
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
