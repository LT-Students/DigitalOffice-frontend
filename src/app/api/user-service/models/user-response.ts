/* tslint:disable */
/* eslint-disable */
import { CompanyUserInfo } from './company-user-info';
import { DepartmentUserInfo } from './department-user-info';
import { ImageInfo } from './image-info';
import { OfficeInfo } from './office-info';
import { PositionInfo } from './position-info';
import { RoleInfo } from './role-info';
import { UserAdditionInfo } from './user-addition-info';
import { UserInfo } from './user-info';
export interface UserResponse {
	companyUser?: CompanyUserInfo;
	departmentUser?: DepartmentUserInfo;
	images?: Array<ImageInfo>;
	office?: OfficeInfo;
	position?: PositionInfo;
	role?: RoleInfo;
	user: UserInfo;
	userAddition: UserAdditionInfo;
}
