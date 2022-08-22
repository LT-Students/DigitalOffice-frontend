/* tslint:disable */
/* eslint-disable */
import { CreateImageNewsResponse } from './create-image-news-response';
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseCreateImageNewsResponse {
  body?: CreateImageNewsResponse;
  errors: Array<string>;
  status: OperationResultStatusType;
}

