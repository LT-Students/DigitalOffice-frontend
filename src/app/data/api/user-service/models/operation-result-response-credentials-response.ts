/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseCredentialsResponse {
  body?: { 'userId'?: string, 'accessToken'?: string, 'refreshToken'?: string, 'accessTokenExpiresIn'?: number, 'refreshTokenExpiresIn'?: number };
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

