/* tslint:disable */
/* eslint-disable */
export interface GuiPatchUserDocument {
	/**
	 * The operation to be performed.
	 */
	op: 'replace';

	/**
	 * A JSON-Pointer.
	 */
	path: '/PortalName' | '/SiteUrl' | '/Logo' | '/Favicon';

	/**
	 * The value to be used within the operations.
	 */
	value?: {};
}
