/* tslint:disable */
/* eslint-disable */
import { CompanyUserInfo } from './company-user-info';
import { DepartmentInfo } from './department-info';
import { EducationInfo } from './education-info';
import { ImageInfo } from './image-info';
import { OfficeInfo } from './office-info';
import { PositionInfo } from './position-info';
import { ProjectInfo } from './project-info';
import { RoleInfo } from './role-info';
import { UserAdditionInfo } from './user-addition-info';
import { UserInfo } from './user-info';
export interface UserResponse {
  companyUser?: CompanyUserInfo;
  department?: DepartmentInfo;
  educations?: Array<EducationInfo>;
  images?: Array<ImageInfo>;
  isPending: boolean;
  office?: OfficeInfo;
  position?: PositionInfo;
  projects?: Array<ProjectInfo>;
  role?: RoleInfo;
  skills?: Array<string>;
  user: UserInfo;
  userAddition: UserAdditionInfo;
}

