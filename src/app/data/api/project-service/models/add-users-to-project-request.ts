/* tslint:disable */
/* eslint-disable */
import { ProjectUserRequest } from './project-user-request';
export interface AddUsersToProjectRequest {

  /**
   * Unique project identifier.
   */
  projectId: string;
  users: Array<ProjectUserRequest>;
}

