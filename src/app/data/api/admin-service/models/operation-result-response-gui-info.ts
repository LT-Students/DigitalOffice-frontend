/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseGuiInfo {
	body?: null | { id?: string; portalName?: string; logoContent?: string; logoExtension?: string; siteUrl?: string };
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
