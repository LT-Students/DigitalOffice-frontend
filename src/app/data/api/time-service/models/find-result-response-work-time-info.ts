/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { WorkTimeInfo } from './work-time-info';
export interface FindResultResponseWorkTimeInfo {
  body?: Array<WorkTimeInfo>;
  errors?: Array<string>;
  status?: OperationResultStatusType;

  /**
   * Total number of finded by filter work times.
   */
  totalCount?: number;
}

