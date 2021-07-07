/* tslint:disable */
/* eslint-disable */
import { ProjectStatusType } from './project-status-type';
import { ProjectUserRequest } from './project-user-request';
export interface ProjectRequest {

  /**
   * Unique department identifier.
   */
  departmentId: string;

  /**
   * Project description.
   */
  description?: string;

  /**
   * Project name.
   */
  name: string;

  /**
   * Project short description.
   */
  shortDescription?: string;

  /**
   * Project short name.
   */
  shortName: string;
  status: ProjectStatusType;
  users?: Array<ProjectUserRequest>;
}

