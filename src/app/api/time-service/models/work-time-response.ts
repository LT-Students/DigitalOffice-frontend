/* tslint:disable */
/* eslint-disable */
import { UserInfo } from './user-info';
import { WorkTimeInfo } from './work-time-info';
import { WorkTimeMonthLimitInfo } from './work-time-month-limit-info';
export interface WorkTimeResponse {
	limitInfo: WorkTimeMonthLimitInfo;
	user?: UserInfo;
	workTime: WorkTimeInfo;
}
