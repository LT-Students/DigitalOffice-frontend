/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ProjectFileInfo } from './project-file-info';
import { ProjectInfo } from './project-info';
import { ProjectUserInfo } from './project-user-info';
export interface ProjectExpandedResponse {
  department?: DepartmentInfo;
  project?: ProjectInfo;
  projectFile?: Array<ProjectFileInfo>;
  users?: Array<ProjectUserInfo>;
}

