/* tslint:disable */
/* eslint-disable */
export interface CreateNewsRequest {
	/**
	 * Unique identifier of the channel in which the news is published.
	 */
	channelId?: string;

	/**
	 * The news content.
	 */
	content: string;

	/**
	 * Allows you to implement delayed publication.
	 */
	isActive: boolean;

	/**
	 * The news preview.
	 */
	preview: string;

	/**
	 * The news subject.
	 */
	subject: string;

	/**
	 * List Ids of news tags.
	 */
	tagsIds: Array<string>;
}
