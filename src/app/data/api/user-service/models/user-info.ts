/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ImageInfo } from './image-info';
import { OfficeInfo } from './office-info';
import { PositionInfo } from './position-info';
import { RoleInfo } from './role-info';
import { UserGender } from './user-gender';
import { UserStatus } from './user-status';
export interface UserInfo {
  about?: null | string;
  city?: null | string;
  dateOfBirth?: null | string;
  departmentInfo?: DepartmentInfo;
  firstName?: string;
  gender?: UserGender;
  id?: string;
  imageInfo?: ImageInfo;
  isActive?: boolean;
  isAdmin?: boolean;
  lastName?: string;
  middleName?: null | string;
  officeInfo?: OfficeInfo;
  positionInfo?: PositionInfo;
  rate?: number;
  roleInfo?: RoleInfo;
  startWorkingAt?: null | string;
  status?: UserStatus;
}

