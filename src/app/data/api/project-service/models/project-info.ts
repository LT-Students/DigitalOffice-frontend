/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ProjectStatusType } from './project-status-type';
export interface ProjectInfo {
  authorId?: string;
  department?: DepartmentInfo;
  description?: string;
  id?: string;
  name?: string;
  shortDescription?: string;
  shortName?: string;
  status?: ProjectStatusType;
}

