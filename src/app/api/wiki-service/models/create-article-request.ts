/* tslint:disable */
/* eslint-disable */
export interface CreateArticleRequest {
	/**
	 * Article's content
	 */
	content: any;
	files?: any;

	/**
	 * Article name.
	 */
	name: string;

	/**
	 * Unique rubric identifier? from which article is inherited.
	 */
	rubricId: any;
}
