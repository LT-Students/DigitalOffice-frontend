/* tslint:disable */
/* eslint-disable */
import { ArticleResponse } from './article-response';

/**
 * Response object for action operations.
 */
export interface ActionResultGetArticleResponse {
	body: Array<ArticleResponse>;
	errors: Array<string>;
}
