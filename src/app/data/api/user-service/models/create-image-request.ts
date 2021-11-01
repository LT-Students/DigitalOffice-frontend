/* tslint:disable */
/* eslint-disable */
export interface CreateImageRequest {
	/**
	 * Image content.
	 */
	content: string;

	/**
	 * Unique entity (user/certificate/education) identifier.
	 */
	entityId: string;

	/**
	 * Type of the entity
	 */
	entityType: 'user' | 'certificate' | 'education';

	/**
	 * Image extension.
	 */
	extension: string;

	/**
	 * shows whether the image is the current avatar or not
	 */
	isCurrentAvatar?: any;

	/**
	 * Image name
	 */
	name?: null | string;
}
