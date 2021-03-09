/* tslint:disable */
/* eslint-disable */
import { ProjectRequest } from './project-request';
import { ProjectUserRequest } from './project-user-request';
export interface ProjectExpandedRequest {
  project: ProjectRequest;
  users: Array<ProjectUserRequest>;
}

