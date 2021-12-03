/* tslint:disable */
/* eslint-disable */
export interface AddImageRequest {
	/**
	 * Image content.
	 */
	content: string;

	/**
	 * Image extension.
	 */
	extension: string;

	/**
	 * shows whether the image is the current avatar or not
	 */
	isCurrentAvatar?: any;

	/**
	 * Image name.
	 */
	name: string;
}
