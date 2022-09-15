/* tslint:disable */
/* eslint-disable */
import { AdminInfo } from './admin-info';
import { GuiInfo } from './gui-info';
import { SmtpInfo } from './smtp-info';
export interface InstallAppRequest {
	adminInfo?: AdminInfo;
	guiInfo?: GuiInfo;
	servicesToDisable?: Array<string>;
	smtpInfo?: SmtpInfo;
}
