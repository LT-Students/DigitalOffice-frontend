/* tslint:disable */
/* eslint-disable */
import { LeaveTimeResponse } from './leave-time-response';
import { OperationResultStatusType } from './operation-result-status-type';
export interface FindResultResponseLeaveTimeResponse {
  body?: Array<LeaveTimeResponse>;
  errors?: Array<string>;
  status?: OperationResultStatusType;

  /**
   * Total number of finded by filter leave times.
   */
  totalCount?: number;
}

