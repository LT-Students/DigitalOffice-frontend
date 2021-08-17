/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { WorkTimeMonthLimitInfo } from './work-time-month-limit-info';
export interface FindResultResponseWorkTimeMonthLimitInfo {
  body?: Array<WorkTimeMonthLimitInfo>;
  errors?: Array<string>;
  status?: OperationResultStatusType;

  /**
   * Total number of finded by filter work times.
   */
  totalCount?: number;
}

