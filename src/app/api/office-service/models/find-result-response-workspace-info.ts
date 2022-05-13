/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { WorkspaceInfo } from './workspace-info';
export interface FindResultResponseWorkspaceInfo {
  body?: Array<WorkspaceInfo>;
  errors: Array<string>;
  status: OperationResultStatusType;
  totalCount: number;
}

