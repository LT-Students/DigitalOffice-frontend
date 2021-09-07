/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { WorkTimeResponse } from './work-time-response';
export interface FindResultResponseWorkTimeResponse {
  body?: Array<WorkTimeResponse>;
  errors?: Array<string>;
  status?: OperationResultStatusType;

  /**
   * Total number of finded by filter work times.
   */
  totalCount?: number;
}

