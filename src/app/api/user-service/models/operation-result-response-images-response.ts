/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseImagesResponse {
	body: Array<ImageInfo>;
	errors: Array<string>;
}
