/* tslint:disable */
/* eslint-disable */
import { UserRequest } from './user-request';
export interface CreateProjectUsersRequest {
	/**
	 * Unique project identifier.
	 */
	projectId: string;
	users: Array<UserRequest>;
}
