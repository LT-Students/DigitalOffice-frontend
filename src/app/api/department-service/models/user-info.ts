/* tslint:disable */
/* eslint-disable */
import { DepartmentUserInfo } from './department-user-info';
import { ImageInfo } from './image-info';
import { PositionInfo } from './position-info';

/**
 * User data.
 */
export interface UserInfo {
	avatar?: ImageInfo;
	departmentUser?: DepartmentUserInfo;
	firstName: string;
	id: string;
	lastName: string;
	middleName?: string;
	position?: PositionInfo;
}
