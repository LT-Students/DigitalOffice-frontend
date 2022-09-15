/* tslint:disable */
/* eslint-disable */
import { CategoryInfo } from './category-info';

/**
 * Response object for action operations.
 */
export interface FindResultResponseCategoryInfo {
	body: Array<CategoryInfo>;
	errors: Array<string>;
	totalCount: number;
}
