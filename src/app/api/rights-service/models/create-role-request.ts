/* tslint:disable */
/* eslint-disable */
import { CreateRoleLocalizationRequest } from './create-role-localization-request';
export interface CreateRoleRequest {
	/**
	 * Role name.
	 */
	localizations: Array<CreateRoleLocalizationRequest>;

	/**
	 * Number of rights.
	 */
	rights: Array<number>;
}
