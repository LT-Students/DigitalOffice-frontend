/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';
import { OperationResultStatusType } from './operation-result-status-type';
export interface OperationResultResponseListImageInfo {
  body?: Array<ImageInfo>;
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

