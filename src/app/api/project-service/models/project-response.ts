/* tslint:disable */
/* eslint-disable */
import { ProjectInfo } from './project-info';
import { ProjectUserInfo } from './project-user-info';
export interface ProjectResponse {
	project: ProjectInfo;
	users?: Array<ProjectUserInfo>;
}
