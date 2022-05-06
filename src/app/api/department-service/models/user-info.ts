/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';

/**
 * User data.
 */
export interface UserInfo {
  avatar?: ImageInfo;
  firstName: string;
  id: string;
  lastName: string;
  middleName?: string;
}

