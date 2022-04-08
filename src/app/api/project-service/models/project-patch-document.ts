/* tslint:disable */
/* eslint-disable */
export interface ProjectPatchDocument {
	/**
	 * The operation to be performed
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path:
		| '/Name'
		| '/ShortName'
		| '/Description'
		| '/Customer'
		| '/StartProject'
		| '/ShortDescription'
		| '/EndProject'
		| '/Status';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
