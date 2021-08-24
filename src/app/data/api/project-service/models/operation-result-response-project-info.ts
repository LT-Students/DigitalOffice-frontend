/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectInfo } from './project-info';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseProjectInfo {
  body?: ProjectInfo;
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

