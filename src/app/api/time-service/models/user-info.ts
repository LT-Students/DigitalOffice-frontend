/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';

/**
 * User data.
 */
export interface UserInfo {
	firstName: string;
	id: string;
	image?: ImageInfo;
	isActive: boolean;
	lastName: string;
	middleName?: string;
}
