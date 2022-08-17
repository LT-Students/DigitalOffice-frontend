/* tslint:disable */
/* eslint-disable */
import { EmailInfo } from './email-info';
export interface UnsentEmailInfo {
	createdAtUtc?: string;
	email?: EmailInfo;
	id?: string;
	lastSendAtUtc?: string;
	totalSendingCount?: number;
}
