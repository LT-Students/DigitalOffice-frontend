/* tslint:disable */
/* eslint-disable */
import { ProjectInfo } from './project-info';
export interface ProjectsResponse {
  body?: Array<ProjectInfo>;
  errors?: Array<string>;

  /**
   * Total number of finded by filter projects.
   */
  totalCount?: number;
}

