/* tslint:disable */
/* eslint-disable */
import { ProjectInfo } from './project-info';
export interface FindResponseProjectInfo {
  body?: Array<ProjectInfo>;
  errors?: Array<string>;

  /**
   * Total number of finded by filter projects.
   */
  totalCount?: number;
}

