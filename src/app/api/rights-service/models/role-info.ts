/* tslint:disable */
/* eslint-disable */
import { RightInfo } from './right-info';
import { RoleLocalizationInfo } from './role-localization-info';
export interface RoleInfo {
	createdBy: string;
	id: string;
	isActive: boolean;
	localizations: Array<RoleLocalizationInfo>;
	rights: Array<RightInfo>;
}
