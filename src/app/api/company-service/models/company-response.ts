/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
import { OfficeInfo } from './office-info';
export interface CompanyResponse {
  contacts?: string;
  description?: string;
  id: string;
  logo?: ImageConsist;
  name: string;
  offices?: Array<OfficeInfo>;
  tagline?: string;
}

