/* tslint:disable */
/* eslint-disable */
import { ImageContent } from './image-content';
import { ImageType } from './image-type';
export interface CreateImageRequest {
  entityId: string;
  imageType: ImageType;
  images: Array<ImageContent>;
}

