/* tslint:disable */
/* eslint-disable */
import { UserInfo } from './user-info';
export interface NewsInfo {
	author?: UserInfo;
	createdAtUtc?: string;
	id?: string;
	preview?: string;
	pseudonym?: string;
	sender?: UserInfo;
	subject?: string;
}
