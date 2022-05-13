/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { UserResponse } from './user-response';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseUserResponse {
  body?: UserResponse;
  errors: Array<string>;
  status: OperationResultStatusType;
}

