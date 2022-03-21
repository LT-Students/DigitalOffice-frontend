/* tslint:disable */
/* eslint-disable */
export interface PatchCompanyUserDocument {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/rate' | '/startworkingat';

	/**
	 * The value to be used within the operations.
	 */
	value?: {};
}
