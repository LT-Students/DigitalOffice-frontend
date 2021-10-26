/* tslint:disable */
/* eslint-disable */
export interface CommunicationPatchDocument {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/Type' | '/Value';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
