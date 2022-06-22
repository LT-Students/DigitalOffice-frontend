/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ImageInfo } from './image-info';
import { PositionInfo } from './position-info';
import { ProjectUserRoleType } from './project-user-role-type';
import { UserStatus } from './user-status';
export interface UserInfo {
	avatarImage?: ImageInfo;

	/**
	 * Data and time added user to project.
	 */
	createdAtUtc: any;
	department?: DepartmentInfo;

	/**
	 * The user first name
	 */
	firstName: string;

	/**
	 * Unique project identifier.
	 */
	id: string;

	/**
	 * User state.
	 */
	isActive: boolean;

	/**
	 * The user last name.
	 */
	lastName: string;

	/**
	 * The user middle name.
	 */
	middleName?: string;

	/**
	 * Data and time removed user from project.
	 */
	modifiedAtUtc?: any;
	position?: PositionInfo;

	/**
	 * Count of project, which user included.
	 */
	projectCount: number;
	rate?: number;
	role: ProjectUserRoleType;
	status: UserStatus;
}
