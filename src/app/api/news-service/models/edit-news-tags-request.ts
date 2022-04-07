/* tslint:disable */
/* eslint-disable */
export interface EditNewsTagsRequest {
	/**
	 * List of tagsIds to add in specified news.
	 */
	tagsToAdd: Array<string>;

	/**
	 * List of tagsIds to remove from specified news.
	 */
	tagsToRemove: Array<string>;
}
