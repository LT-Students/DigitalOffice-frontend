/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ImageInfo } from './image-info';
import { PositionInfo } from './position-info';
import { UserRoleType } from './user-role-type';
import { UserStatus } from './user-status';
export interface ProjectUserInfo {
  avatarImage?: ImageInfo;

  /**
   * Data and time added user to project.
   */
  createdAtUtc?: any;
  department?: DepartmentInfo;

  /**
   * The user first name
   */
  firstName?: string;

  /**
   * Unique project identifier.
   */
  id?: string;

  /**
   * Unique project identifier.
   */
  imageId?: string;

  /**
   * User state.
   */
  isActive?: boolean;

  /**
   * The user last name.
   */
  lastName?: string;

  /**
   * The user middle name.
   */
  middleName?: null | string;

  /**
   * Data and time removed user from project.
   */
  modifiedAtUtc?: null | any;
  position?: PositionInfo;

  /**
   * Count of project, which user included.
   */
  projectCount?: number;
  role?: UserRoleType;
  status?: UserStatus;
}

