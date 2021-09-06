/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectStatusType } from './project-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseProjectInfo {
  body?: { 'id'?: string, 'authorId'?: string, 'status'?: ProjectStatusType, 'name'?: string, 'shortName'?: string, 'description'?: string, 'shortDescription'?: string, 'department'?: DepartmentInfo, 'CreatedAtUtc'?: any };
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

