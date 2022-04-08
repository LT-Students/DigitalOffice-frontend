/* tslint:disable */
/* eslint-disable */
export interface NewsPatchOperation {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/Preview' | '/Content' | '/Subject' | '/ChannelId' | '/IsActive';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
