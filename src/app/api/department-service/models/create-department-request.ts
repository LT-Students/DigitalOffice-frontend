/* tslint:disable */
/* eslint-disable */
import { CreateUserRequest } from './create-user-request';
export interface CreateDepartmentRequest {
	/**
	 * Department description.
	 */
	description?: null | string;

	/**
	 * Department name.
	 */
	name: string;

	/**
	 * Department short name.
	 */
	shortName: string;
	users: Array<CreateUserRequest>;
}
