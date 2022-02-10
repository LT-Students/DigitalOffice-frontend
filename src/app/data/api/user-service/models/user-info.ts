/* tslint:disable */
/* eslint-disable */
import { CompanyInfo } from './company-info';
import { DepartmentInfo } from './department-info';
import { ImageInfo } from './image-info';
import { OfficeInfo } from './office-info';
import { PositionInfo } from './position-info';
import { RoleInfo } from './role-info';
import { UserStatus } from './user-status';
export interface UserInfo {
	avatar?: null | ImageInfo;
	company?: null | CompanyInfo;
	department?: null | DepartmentInfo;
	firstName?: string;
	id?: string;
	isActive?: boolean;
	isAdmin?: boolean;
	lastName?: string;
	middleName?: null | string;
	office?: null | OfficeInfo;
	position?: null | PositionInfo;
	rate?: null | number;
	role?: null | RoleInfo;
	startWorkingAt?: null | string;
	status?: UserStatus;
	dateOfBirth?: null | string;
	gender?: string;
	about?: null | string;
}
