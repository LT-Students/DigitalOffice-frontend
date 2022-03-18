/* tslint:disable */
/* eslint-disable */
export interface PatchCertificateDocument {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/Name' | '/SchoolName' | '/EducationType' | '/ReceivedAt' | '/IsActive';

	/**
	 * The value to be used within the operations.
	 */
	value: {};
}
