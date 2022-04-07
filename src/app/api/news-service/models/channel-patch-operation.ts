/* tslint:disable */
/* eslint-disable */
export interface ChannelPatchOperation {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/PinnedMessage' | '/PinnedNewsId' | '/Name' | '/IsActive' | '/Image';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
