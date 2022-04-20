/* tslint:disable */
/* eslint-disable */
import { ImageContent } from './image-content';
export interface CreateImageRequest {

  /**
   * Unique identifier.
   */
  certificateId: string;
  images: Array<ImageContent>;
}

