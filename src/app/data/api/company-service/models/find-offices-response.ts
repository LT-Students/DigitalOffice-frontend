/* tslint:disable */
/* eslint-disable */
import { OfficeInfo } from './office-info';
export interface FindOfficesResponse {
  errors?: Array<string>;
  offices?: Array<OfficeInfo>;
  totalCount?: number;
}

