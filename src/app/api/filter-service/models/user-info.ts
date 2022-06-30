/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ImageInfo } from './image-info';
import { OfficeInfo } from './office-info';
import { PositionInfo } from './position-info';
import { ProjectInfo } from './project-info';
import { RoleInfo } from './role-info';
export interface UserInfo {
	avatar?: ImageInfo;
	department?: DepartmentInfo;
	firstName: string;
	id: string;
	lastName: string;
	middleName?: string;
	office?: OfficeInfo;
	position?: PositionInfo;
	projects?: Array<ProjectInfo>;
	role?: RoleInfo;
}
