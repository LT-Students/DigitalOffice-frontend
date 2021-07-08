/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { PositionInfo } from './position-info';
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
  isAdmin?: boolean;
  lastName?: string;
  middleName?: null | string;
  positionInfo?: PositionInfo;
  rate?: number;
  startWorkingAt?: null | string;
  status?: UserStatus;
}

