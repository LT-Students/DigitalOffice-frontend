/* tslint:disable */
/* eslint-disable */
import { ImageType } from './image-type';
export interface ImageInfo {

  /**
   * Image file content in base64 encoded string.
   */
  content?: string;
  extension?: string;
  id?: string;
  name?: null | string;
  parentId?: null | string;
  type?: ImageType;
}

