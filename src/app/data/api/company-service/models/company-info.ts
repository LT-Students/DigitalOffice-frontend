/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';
import { OfficeInfo } from './office-info';
import { PositionInfo } from './position-info';
import { ShortDepartmentInfo } from './short-department-info';
export interface CompanyInfo {
  companyName?: string;
  departments?: Array<ShortDepartmentInfo>;
  description?: string;
  id?: string;
  logo?: ImageInfo;
  offices?: Array<OfficeInfo>;
  portalName?: string;
  positions?: Array<PositionInfo>;
  siteUrl?: string;
  tagline?: string;
}

