/* tslint:disable */
/* eslint-disable */
import { UserInfo } from './user-info';
export interface UsersResponse {
  errors?: Array<string>;

  /**
   * Total number of all users.
   */
  totalCount?: number;
  users?: Array<UserInfo>;
}

