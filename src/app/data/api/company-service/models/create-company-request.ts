/* tslint:disable */
/* eslint-disable */
import { AdminInfo } from './admin-info';
import { Smtp } from './smtp';
export interface CreateCompanyRequest {
  adminInfo: AdminInfo;
  companyName: string;
  portalName: string;
  sMTP: Smtp;
  siteUrl: string;
}

