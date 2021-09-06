/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseByteArray {
  body?: string;
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

