/* tslint:disable */
/* eslint-disable */
import { CreateUserRequest } from './create-user-request';
export interface CreateProjectUsersRequest {
	/**
	 * Unique project identifier.
	 */
	projectId: string;
	users: Array<CreateUserRequest>;
}
