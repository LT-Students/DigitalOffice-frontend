/* tslint:disable */
/* eslint-disable */
import { ImageType } from './image-type';
export interface ImageInfo {
	/**
	 * Image content.
	 */
	content?: string;

	/**
	 * Image extension.
	 */
	extension?: string;

	/**
	 * Image global unique identifier.
	 */
	id?: string;

	/**
	 * Image name.
	 */
	name?: string;

	/**
	 * If this image is thumb it is full image global unique identifier, else null.
	 */
	parentId?: null | string;
	type?: ImageType;
}
