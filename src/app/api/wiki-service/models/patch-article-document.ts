/* tslint:disable */
/* eslint-disable */
export interface PatchArticleDocument {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/name' | '/content' | '/isActive' | '/rubricId';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
