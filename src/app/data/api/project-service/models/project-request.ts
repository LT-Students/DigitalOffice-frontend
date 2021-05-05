/* tslint:disable */
/* eslint-disable */
import { ProjectStatusType } from './project-status-type';
import { ProjectUser } from './project-user';
export interface ProjectRequest {
  departmentId: string;
  description?: string;
  name: string;
  shortDescription?: string;
  shortName: string;
  status?: ProjectStatusType;
  users?: Array<ProjectUser>;
}

