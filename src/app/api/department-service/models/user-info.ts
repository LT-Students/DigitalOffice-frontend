/* tslint:disable */
/* eslint-disable */
import { DepartmentUserInfo } from './department-user-info';
import { PositionInfo } from './position-info';

/**
 * User data.
 */
export interface UserInfo {
	departmentUser?: DepartmentUserInfo;
	firstName: string;
	id: string;
	imageId?: string;
	lastName: string;
	middleName?: string;
	position?: PositionInfo;
}
