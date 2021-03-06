/* tslint:disable */
/* eslint-disable */
import { Project } from './project';
import { ProjectUser } from './project-user';
export interface ProjectExpandedRequest {
  project?: Project;
  users?: Array<ProjectUser>;
}

