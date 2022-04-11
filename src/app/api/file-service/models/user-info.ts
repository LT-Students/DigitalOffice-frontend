/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ImageInfo } from './image-info';
import { OfficeInfo } from './office-info';
import { PositionInfo } from './position-info';
import { RoleInfo } from './role-info';
export interface UserInfo {
	avatar?: null | ImageInfo;
	department?: null | DepartmentInfo;
	firstName?: string;
	id?: string;
	lastName?: string;
	middleName?: null | string;
	office?: null | OfficeInfo;
	position?: null | PositionInfo;
	role?: null | RoleInfo;
}
