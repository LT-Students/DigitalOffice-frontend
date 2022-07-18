import { DateTime } from 'luxon';
import { LeaveType } from '@api/time-service/models/leave-type';
import { LeaveTime } from '../../../models/leave-time';

export class ChartLeaveTime {
	public leaveType: LeaveType;
	public hours: number;

	constructor(
		{ startTime, endTime, leaveType }: LeaveTime,
		selectedDate: DateTime,
		getDurationFn: (...args: any[]) => number
	) {
		this.leaveType = leaveType;

		if (startTime.month !== selectedDate.month || startTime.year !== selectedDate.year) {
			startTime = selectedDate.startOf('month');
		}
		if (endTime.month !== selectedDate.month || endTime.year !== selectedDate.year) {
			endTime = selectedDate.endOf('month');
		}

		this.hours = getDurationFn(startTime, endTime);
	}
}
