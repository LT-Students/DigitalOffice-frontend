/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseImagesResponse {
  body: Array<ImageInfo>;
  errors: Array<string>;
  status: OperationResultStatusType;
}

