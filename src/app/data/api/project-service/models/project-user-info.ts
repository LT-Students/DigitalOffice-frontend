/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ImageInfo } from './image-info';
import { PositionInfo } from './position-info';
import { ProjectUserRoleType } from './project-user-role-type';
import { UserStatus } from './user-status';
export interface ProjectUserInfo {

  /**
   * Data and time added user to project.
   */
  addedOn?: any;
  avatarImage?: ImageInfo;
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
  position?: PositionInfo;

  /**
   * Count of project, which user included.
   */
  projectCount?: number;

  /**
   * Data and time removed user from project.
   */
  removedOn?: null | any;
  role?: ProjectUserRoleType;
  status?: UserStatus;
}

