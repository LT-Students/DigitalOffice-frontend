/* tslint:disable */
/* eslint-disable */
import { ImageResponse } from './image-response';
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseImageResponse {
  body?: ImageResponse;
  errors: Array<string>;
  status: OperationResultStatusType;
}

