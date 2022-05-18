/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { WorkspaceTypeInfo } from './workspace-type-info';
export interface FindResultResponseWorkspaceTypeInfo {
  body?: Array<WorkspaceTypeInfo>;
  errors: Array<string>;
  status: OperationResultStatusType;
  totalCount: number;
}

