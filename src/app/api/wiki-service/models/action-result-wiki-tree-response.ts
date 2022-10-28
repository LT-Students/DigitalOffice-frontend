/* tslint:disable */
/* eslint-disable */
import { RubricData } from './rubric-data';

/**
 * Response object for action operations.
 */
export interface ActionResultWikiTreeResponse {
	body: Array<RubricData>;
	errors: Array<string>;
}
