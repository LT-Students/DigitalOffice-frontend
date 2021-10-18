/* tslint:disable */
/* eslint-disable */
export interface TaskPropertyPatchDocument {
	/**
	 * The operation to be performed
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/Name' | '/PropertyType' | '/Description' | '/ProjectId' | '/IsActive';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
