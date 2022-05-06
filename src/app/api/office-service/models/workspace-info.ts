/* tslint:disable */
/* eslint-disable */
import { WorkspaceTypeInfo } from './workspace-type-info';
export interface WorkspaceInfo {
  description?: string;
  id: string;
  isBookable?: boolean;
  name: string;
  parentId?: string;
  workspaceType: WorkspaceTypeInfo;
}

