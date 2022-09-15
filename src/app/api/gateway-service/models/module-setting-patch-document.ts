/* tslint:disable */
/* eslint-disable */
export interface ModuleSettingPatchDocument {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/Host' | '/Port' | '/EnableSsl' | '/Email' | '/Password';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
