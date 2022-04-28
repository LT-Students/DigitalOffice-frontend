/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { PendingUserInfo } from './pending-user-info';

/**
 * Response object for action operations.
 */
export interface FindResultResponsePendingUserInfo {
  body: Array<PendingUserInfo>;
  errors: Array<string>;
  status: OperationResultStatusType;
  totalCount: number;
}

