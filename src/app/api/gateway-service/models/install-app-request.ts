/* tslint:disable */
/* eslint-disable */
import { AdminInfo } from './admin-info';
import { CreateGuiRequest } from './create-gui-request';
import { SmtpInfo } from './smtp-info';
export interface InstallAppRequest {
	adminInfo?: AdminInfo;
	createGuiRequest?: CreateGuiRequest;
	servicesToDisable?: Array<string>;
	smtpInfo?: SmtpInfo;
}
