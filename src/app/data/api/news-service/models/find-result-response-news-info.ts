/* tslint:disable */
/* eslint-disable */
import { NewsInfo } from './news-info';
import { OperationResultStatusType } from './operation-result-status-type';
export interface FindResultResponseNewsInfo {
  body?: Array<NewsInfo>;
  errors?: Array<string>;
  status?: OperationResultStatusType;

  /**
   * Total number of finded by filter news.
   */
  totalCount?: number;
}

