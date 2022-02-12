/* tslint:disable */
/* eslint-disable */
export interface PatchWorkspaceDocument {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/Name' | '/Description' | '/IsActive' | '/Image';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
