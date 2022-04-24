/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { StatInfo } from './stat-info';
export interface FindResultResponseStatInfo {
  body?: Array<StatInfo>;
  errors?: Array<string>;
  status?: OperationResultStatusType;

  /**
   * Total number of finded users by filter.
   */
  totalCount?: number;
}

