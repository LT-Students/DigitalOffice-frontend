/* tslint:disable */
/* eslint-disable */
import { LeaveTimeInfo } from './leave-time-info';
import { OperationResultStatusType } from './operation-result-status-type';
export interface FindResultResponseLeaveTimeInfo {
  body?: Array<LeaveTimeInfo>;
  errors?: Array<string>;
  status?: OperationResultStatusType;

  /**
   * Total number of finded by filter leave times.
   */
  totalCount?: number;
}

