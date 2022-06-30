/* tslint:disable */
/* eslint-disable */
import { LeaveTimeInfo } from './leave-time-info';
import { UserInfo } from './user-info';
import { WorkTimeInfo } from './work-time-info';
import { WorkTimeMonthLimitInfo } from './work-time-month-limit-info';
export interface UserStatInfo {
	leaveTimes: Array<LeaveTimeInfo>;
	limitInfo: WorkTimeMonthLimitInfo;
	user?: UserInfo;
	workTimes: Array<WorkTimeInfo>;
}
