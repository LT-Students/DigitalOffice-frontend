/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
export interface OperationResultResponsePositionInfo {
  body?: { 'id'?: string, 'name'?: string, 'description'?: string, 'isActive'?: boolean };
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

