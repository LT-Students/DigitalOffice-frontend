/* tslint:disable */
/* eslint-disable */
import { ProjectFileInfo } from './project-file-info';
import { ProjectInfo } from './project-info';
import { ProjectUserInfo } from './project-user-info';
export interface ProjectResponse {
  errors?: Array<string>;
  files?: Array<ProjectFileInfo>;
  project?: ProjectInfo;
  users?: Array<ProjectUserInfo>;
}

