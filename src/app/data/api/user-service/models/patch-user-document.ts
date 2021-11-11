/* tslint:disable */
/* eslint-disable */
export interface PatchUserDocument {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path:
		| '/FirstName'
		| '/LastName'
		| '/MiddleName'
		| '/Gender'
		| '/DateOfBirth'
		| '/City'
		| '/Status'
		| '/StartWorkingAt'
		| '/About'
		| '/IsActive';

	/**
	 * The value to be used within the operations.
	 */
	value?: {};
}
