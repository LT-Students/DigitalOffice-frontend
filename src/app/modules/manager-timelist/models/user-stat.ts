import { UserStatInfo } from '@api/time-service/models/user-stat-info';
import { ImageInfo } from '@app/models/image.model';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { LeaveTimeInfo } from '@api/time-service/models/leave-time-info';
import { WorkTimeMonthLimitInfo } from '@api/time-service/models/work-time-month-limit-info';
import { LeaveType } from '@api/time-service/models/leave-type';
import { DateTime } from 'luxon';
import { TimeDuration } from '@app/services/time-duration.service';

interface UserInfo {
	firstName: string;
	id: string;
	avatar?: ImageInfo;
	isActive: boolean;
	lastName: string;
	middleName?: string;
	position?: { id: string; name: string };
}

interface CompanyInfo {
	rate: number;
	contractName?: string;
}

export interface LeaveTime {
	id: string;
	leaveType: LeaveType;
	comment?: string;
	startDate: DateTime;
	endDate: DateTime;
	hours: number;
}

export class LeaveTimeFactory {
	public static create(lt: LeaveTimeInfo, monthLimit: WorkTimeMonthLimitInfo, rate: number): LeaveTime {
		const startDate = DateTime.fromISO(lt.startTime as string);
		const endDate = DateTime.fromISO(lt.endTime as string);
		return {
			id: lt.id,
			leaveType: lt.leaveType,
			comment: lt.comment,
			startDate,
			endDate,
			hours: this.countHours({ startDate, endDate }, monthLimit, rate),
		};
	}

	public static countHours(
		interval: {
			startDate: DateTime;
			endDate: DateTime;
		},
		monthLimit: WorkTimeMonthLimitInfo,
		rate: number
	): number {
		let startDate = interval.startDate;
		let endDate = interval.endDate;
		if (interval.startDate.month !== monthLimit.month || interval.startDate.year !== monthLimit.year) {
			startDate = DateTime.fromObject({ month: monthLimit.month, year: monthLimit.year }).startOf('month');
		}
		if (interval.endDate.month !== monthLimit.month || interval.endDate.year !== monthLimit.year) {
			endDate = DateTime.fromObject({ month: monthLimit.month, year: monthLimit.year }).endOf('month');
		}
		const holidays = monthLimit.holidays.split('').map(Number).map(Boolean);
		return TimeDuration.getDuration({ startDate, endDate }, 8 * rate, this.filterWeekends.bind(this, holidays));
	}

	private static filterWeekends(holidays: boolean[], date: DateTime): boolean {
		return holidays.length
			? holidays.every((isHoliday: boolean, day: number) => (isHoliday ? date.day !== day + 1 : true))
			: date.weekday !== 6 && date.weekday !== 7;
	}
}

export class UserStat {
	public user: UserInfo;
	public companyInfo: CompanyInfo;
	public workTimes: WorkTimeInfo[];
	public leaveTimes: LeaveTime[];
	public limitInfo: WorkTimeMonthLimitInfo;

	constructor(data: UserStatInfo) {
		this.user = { ...data.user, avatar: data.user.image, position: data.position };
		this.companyInfo = {
			rate: data.companyUser?.rate || 1,
			contractName: data.companyUser?.contractSubject?.name,
		};
		this.limitInfo = data.limitInfo as WorkTimeMonthLimitInfo;
		this.workTimes = data.workTimes;
		this.leaveTimes = data.leaveTimes
			.filter((lt: LeaveTimeInfo) => lt.isActive)
			.map((lt: LeaveTimeInfo) => LeaveTimeFactory.create(lt, this.limitInfo, this.companyInfo.rate));
	}
}
