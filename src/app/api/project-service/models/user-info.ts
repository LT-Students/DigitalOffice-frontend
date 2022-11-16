/* tslint:disable */
/* eslint-disable */
import { PositionInfo } from './position-info';
import { ProjectUserRoleType } from './project-user-role-type';
export interface UserInfo {
	/**
	 * The user first name
	 */
	firstName: string;

	/**
	 * Unique project identifier.
	 */
	id: string;

	/**
	 * Unique image (avatar) identifier.
	 */
	imageId?: string;

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
	position?: PositionInfo;
	role: ProjectUserRoleType;
}
