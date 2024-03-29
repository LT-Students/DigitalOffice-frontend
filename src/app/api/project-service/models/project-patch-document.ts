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
		| '/ShortDescription'
		| '/Customer'
		| '/StartDateUtc'
		| '/EndDateUtc'
		| '/Status';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
