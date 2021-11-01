/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';
import { PositionInfo } from './position-info';

/**
 * User data of specific department.
 */
export interface DepartmentUserInfo {
	firstName?: string;
	id?: string;
	image?: null | ImageInfo;
	isActive?: boolean;
	lastName?: string;
	middleName?: null | string;
	position?: PositionInfo;
	rate?: number;
}
