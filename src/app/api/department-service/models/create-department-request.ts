/* tslint:disable */
/* eslint-disable */
import { CreateUserRequest } from './create-user-request';
export interface CreateDepartmentRequest {
	/**
	 * Department categoryId.
	 */
	categoryId?: string;

	/**
	 * Department description.
	 */
	description?: string;

	/**
	 * Department name.
	 */
	name: string;

	/**
	 * Department parentId.
	 */
	parentId?: string;

	/**
	 * Department short name.
	 */
	shortName: string;
	users: Array<CreateUserRequest>;
}
