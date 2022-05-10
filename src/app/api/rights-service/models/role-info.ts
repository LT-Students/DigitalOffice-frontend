/* tslint:disable */
/* eslint-disable */
import { RightInfo } from './right-info';
import { RoleLocalizationInfo } from './role-localization-info';
import { UserInfo } from './user-info';
export interface RoleInfo {
  createdAtUtc?: string;
  createdBy?: string;
  id?: string;
  isActive?: boolean;
  localizations?: Array<RoleLocalizationInfo>;
  modifiedAtUtc?: null | string;
  modifiedBy?: UserInfo;
  rights?: Array<RightInfo>;
}

