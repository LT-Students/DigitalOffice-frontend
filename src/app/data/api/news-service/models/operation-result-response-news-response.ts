/* tslint:disable */
/* eslint-disable */
import { Department } from './department';
import { OperationResultStatusType } from './operation-result-status-type';
import { User } from './user';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseNewsResponse {
  body?: { 'id'?: string, 'preview'?: string, 'content'?: string, 'subject'?: string, 'author'?: User, 'department'?: Department, 'isactive'?: boolean, 'createdAtUtc'?: string, 'createdBy'?: string };
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

