/* tslint:disable */
/* eslint-disable */
import { CreateUserRequest } from './create-user-request';
export interface CreateDepartmentUsersRequest {
	departmentId: string;
	users: Array<CreateUserRequest>;
}
