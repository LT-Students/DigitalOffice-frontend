/* tslint:disable */
/* eslint-disable */
export interface RubricPatchDocument {
	/**
	 * The operation to be performed
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/name' | '/parentId' | '/isActive';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
