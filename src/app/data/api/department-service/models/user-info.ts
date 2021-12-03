/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';
import { PositionInfo } from './position-info';

/**
 * User data.
 */
export interface UserInfo {
	firstName?: string;
	id?: string;
	image?: ImageInfo;
	isActive?: boolean;
	lastName?: string;
	middleName?: null | string;
	position?: PositionInfo;
	rate?: number;
}
