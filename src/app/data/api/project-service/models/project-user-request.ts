/* tslint:disable */
/* eslint-disable */
import { UserRequest } from './user-request';
export interface ProjectUserRequest {
  projectId?: string;
  roleId: string;
  user: UserRequest;
}
