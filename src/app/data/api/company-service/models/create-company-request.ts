/* tslint:disable */
/* eslint-disable */
import { AddImageRequest } from './add-image-request';
import { AdminInfo } from './admin-info';
import { SmtpInfo } from './smtp-info';
export interface CreateCompanyRequest {
	adminInfo: AdminInfo;
	companyName: string;
	isDepartmentModuleEnabled?: boolean;
	logo?: AddImageRequest;
	portalName: string;
	siteUrl: string;
	smtpInfo: SmtpInfo;
	workDaysApiUrl?: string;
}
