/* tslint:disable */
/* eslint-disable */
import { UserInfo } from './user-info';
export interface UsersResponse {

  /**
   * Total number of all users.
   */
  count?: number;
  errors?: Array<string>;
  users?: Array<UserInfo>;
}

