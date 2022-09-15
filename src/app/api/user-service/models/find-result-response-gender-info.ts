/* tslint:disable */
/* eslint-disable */
import { GenderInfo } from './gender-info';

/**
 * Response object for action operations.
 */
export interface FindResultResponseGenderInfo {
	body: Array<GenderInfo>;
	errors: Array<string>;
	totalCount: number;
}
