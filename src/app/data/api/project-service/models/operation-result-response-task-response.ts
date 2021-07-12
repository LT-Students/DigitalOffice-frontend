/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { TaskResponse } from './task-response';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseTaskResponse {
  body?: TaskResponse;
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

