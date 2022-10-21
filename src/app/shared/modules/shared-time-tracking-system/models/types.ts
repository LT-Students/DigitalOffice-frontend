import { LeaveType } from '@api/time-service/models/leave-type';
import { DateTime } from 'luxon';
import { WorkTimeMonthLimitInfo } from '@api/time-service/models/work-time-month-limit-info';

export interface Holidays {
	year: number;
	month: number;
	holidays: boolean[];
}

export class HolidaysFactory {
	public static create(limit?: WorkTimeMonthLimitInfo | null): Holidays {
		return {
			month: limit?.month || 0,
			year: limit?.year || 0,
			holidays: limit ? limit.holidays.split('').map(Number).map(Boolean) : [],
		};
	}
}

export interface SubmitLeaveTimeValue {
	leaveType: LeaveType;
	startTime: DateTime;
	endTime: DateTime;
	minutes: number;
	comment: string | null;
	leaveTimeId?: string;
}
