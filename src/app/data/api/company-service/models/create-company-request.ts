/* tslint:disable */
/* eslint-disable */
import { AdminInfo } from './admin-info';
import { SmtpInfo } from './smtp-info';
export interface CreateCompanyRequest {
  adminInfo: AdminInfo;
  companyName: string;
  isDepartmentModuleEnabled?: boolean;
  portalName: string;
  siteUrl: string;
  smtpInfo: SmtpInfo;
}

