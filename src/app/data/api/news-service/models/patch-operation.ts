/* tslint:disable */
/* eslint-disable */
export interface PatchOperation {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/Preview' | '/Content' | '/Subject' | '/Pseudonum' | '/Description' | '/IsActive';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
