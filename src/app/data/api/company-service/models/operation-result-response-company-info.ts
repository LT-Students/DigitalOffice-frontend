/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ImageInfo } from './image-info';
import { OfficeInfo } from './office-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { PositionInfo } from './position-info';
import { SmtpInfo } from './smtp-info';
export interface OperationResultResponseCompanyInfo {
  body?: { 'id'?: string, 'portalName'?: string, 'companyName'?: string, 'description'?: string, 'tagline'?: string, 'siteUrl'?: string, 'IsDepartmentModuleEnabled'?: boolean, 'logo'?: ImageInfo, 'smtpInfo'?: SmtpInfo, 'departments'?: Array<DepartmentInfo>, 'positions'?: Array<PositionInfo>, 'offices'?: Array<OfficeInfo> };
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

