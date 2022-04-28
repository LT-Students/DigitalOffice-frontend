/* tslint:disable */
/* eslint-disable */
import { FileInfo } from './file-info';
import { OperationResultStatusType } from './operation-result-status-type';
export interface OperationResultResponseFiles {
  body?: Array<FileInfo>;
  errors: Array<string>;
  status: OperationResultStatusType;
}

