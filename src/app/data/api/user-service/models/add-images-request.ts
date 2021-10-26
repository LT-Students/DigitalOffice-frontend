/* tslint:disable */
/* eslint-disable */
import { AddImageRequest } from './add-image-request';
export interface AddImagesRequest {
	/**
	 * Unique entity (user/certificate/education) identifier.
	 */
	entityId: string;

	/**
	 * Type of the entity
	 */
	entityType: 'user' | 'certificate' | 'education';
	images: Array<AddImageRequest>;
}
