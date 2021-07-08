/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';
import { OfficeInfo } from './office-info';
import { PositionInfo } from './position-info';
import { ShortDepartmentInfo } from './short-department-info';
import { SmtpInfo } from './smtp-info';
export interface CompanyInfo {
  companyName?: string;
  departments?: null | Array<ShortDepartmentInfo>;
  description?: null | string;
  id?: string;
  logo?: ImageInfo;
  offices?: null | Array<OfficeInfo>;
  portalName?: string;
  positions?: null | Array<PositionInfo>;
  siteUrl?: string;
  smtpInfo?: SmtpInfo;
  tagline?: null | string;
}

