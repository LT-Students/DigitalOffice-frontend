/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectFileInfo } from './project-file-info';
import { ProjectInfo } from './project-info';
import { ProjectUserInfo } from './project-user-info';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseProjectResponse {
  body?: { 'project'?: ProjectInfo, 'users'?: Array<ProjectUserInfo>, 'files'?: Array<ProjectFileInfo> };
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

