/* tslint:disable */
/* eslint-disable */
export interface PatchDepartmentDocument {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/name' | '/shortName' | '/description' | '/isactive' | '/categoryId';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
