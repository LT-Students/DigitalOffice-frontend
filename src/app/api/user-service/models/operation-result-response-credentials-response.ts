/* tslint:disable */
/* eslint-disable */
import { CredentialsResponse } from './credentials-response';
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseCredentialsResponse {
  body?: CredentialsResponse;
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

