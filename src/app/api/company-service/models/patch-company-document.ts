/* tslint:disable */
/* eslint-disable */
export interface PatchCompanyDocument {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/name' | '/tagline' | '/description' | '/logo' | '/contacts';

	/**
	 * The value to be used within the operations.
	 */
	value?: {};
}
