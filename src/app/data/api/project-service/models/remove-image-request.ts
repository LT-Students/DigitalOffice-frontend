/* tslint:disable */
/* eslint-disable */
import { ImageType } from './image-type';
export interface RemoveImageRequest {
  entityId: string;
  imageType: ImageType;
  imagesIds: Array<string>;
}

