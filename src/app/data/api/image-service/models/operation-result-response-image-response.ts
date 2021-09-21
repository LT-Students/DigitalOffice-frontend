/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseImageResponse {
  body?: { 'id'?: string, 'content'?: string, 'name'?: string, 'extension'?: string };
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

