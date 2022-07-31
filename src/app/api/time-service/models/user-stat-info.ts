/* tslint:disable */
/* eslint-disable */
import { CompanyUserInfo } from './company-user-info';
import { DepartmentInfo } from './department-info';
import { LeaveTimeInfo } from './leave-time-info';
import { PositionInfo } from './position-info';
import { UserInfo } from './user-info';
import { WorkTimeInfo } from './work-time-info';
import { WorkTimeMonthLimitInfo } from './work-time-month-limit-info';
export interface UserStatInfo {
	companyUser?: CompanyUserInfo;
	department?: DepartmentInfo;
	leaveTimes: Array<LeaveTimeInfo>;
	limitInfo: WorkTimeMonthLimitInfo;
	position?: PositionInfo;
	user: UserInfo;
	workTimes: Array<WorkTimeInfo>;
}
