/* tslint:disable */
/* eslint-disable */
import { ImagesIds } from './images-ids';
export interface RemoveImagesRequest {
	/**
	 * Unique entity (user/certificate/education) identifier.
	 */
	entityId: string;

	/**
	 * Type of the entity
	 */
	entityType: 'user' | 'certificate' | 'education';
	imagesIds: ImagesIds;
}
