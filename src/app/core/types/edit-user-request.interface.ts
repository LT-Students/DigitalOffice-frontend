import { EditUserRequest } from '@api/user-service/models/edit-user-request';

export interface IEditUserRequest {
	/**
	 * Specific user id
	 */
	userId: string;
	body?: EditUserRequest;
}
