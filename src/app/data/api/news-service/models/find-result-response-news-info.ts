/* tslint:disable */
/* eslint-disable */
import { Department } from './department';
import { OperationResultStatusType } from './operation-result-status-type';
import { User } from './user';
export interface FindResultResponseNewsInfo {
  body?: { 'id'?: string, 'preview'?: string, 'subject'?: string, 'pseudonum'?: string, 'author'?: User, 'department'?: Department, 'isactive'?: boolean, 'createdatutc'?: string, 'createdby'?: string };
  errors?: Array<string>;
  status?: OperationResultStatusType;

  /**
   * Total number of finded by filter news.
   */
  totalCount?: number;
}

