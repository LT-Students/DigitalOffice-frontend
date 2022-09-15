/* tslint:disable */
/* eslint-disable */
import { UserResponse } from './user-response';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseUserResponse {
	body?: UserResponse;
	errors: Array<string>;
}
