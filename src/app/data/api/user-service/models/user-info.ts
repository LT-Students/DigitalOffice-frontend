/* tslint:disable */
/* eslint-disable */
import { UserGender } from './user-gender';
import { UserStatus } from './user-status';
export interface UserInfo {
  about?: null | string;
  city?: null | string;
  dateOfBirth?: null | string;
  firstName?: string;
  gender?: UserGender;
  id?: string;
  isAdmin?: boolean;
  lastName?: string;
  middleName?: null | string;
  rate?: number;
  startWorkingAt?: null | string;
  status?: UserStatus;
}

