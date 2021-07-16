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
  avatar?: ImageInfo;
  city?: null | string;
  dateOfBirth?: null | string;
  department?: DepartmentInfo;
  firstName?: string;
  gender?: UserGender;
  id?: string;
  isActive?: boolean;
  isAdmin?: boolean;
  lastName?: string;
  middleName?: null | string;
  office?: OfficeInfo;
  position?: PositionInfo;
  rate?: number;
  role?: RoleInfo;
  startWorkingAt?: null | string;
  status?: UserStatus;
}

