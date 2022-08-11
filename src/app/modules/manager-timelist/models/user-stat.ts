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

export class LeaveTime {
	public id: string;
	public leaveType: LeaveType;
	public comment?: string;
	public startDate: DateTime;
	public endDate: DateTime;
	public hours: number;

	constructor(lt: LeaveTimeInfo, monthLimit: WorkTimeMonthLimitInfo, rate: number) {
		this.id = lt.id;
		this.leaveType = lt.leaveType;
		this.comment = lt.comment;
		this.startDate = DateTime.fromISO(lt.startTime as string);
		this.endDate = DateTime.fromISO(lt.endTime as string);
		this.hours = this.countHours(monthLimit, rate);
	}

	private countHours(monthLimit: WorkTimeMonthLimitInfo, rate: number): number {
		let startDate = this.startDate;
		let endDate = this.endDate;
		if (this.startDate.month !== monthLimit.month || this.startDate.year !== monthLimit.year) {
			startDate = DateTime.fromObject({ month: monthLimit.month, year: monthLimit.year }).startOf('month');
		}
		if (this.endDate.month !== monthLimit.month || this.endDate.year !== monthLimit.year) {
			endDate = DateTime.fromObject({ month: monthLimit.month, year: monthLimit.year }).endOf('month');
		}
		const holidays = monthLimit.holidays.split('').map(Number).map(Boolean);
		return TimeDuration.getDuration({ startDate, endDate }, 8 * rate, this.filterWeekends.bind(this, holidays));
	}

	private filterWeekends(holidays: boolean[], date: DateTime): boolean {
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
			contractName: data.companyUser?.contractSubjectData?.name,
		};
		this.limitInfo = data.limitInfo as WorkTimeMonthLimitInfo;
		this.workTimes = data.workTimes;
		this.leaveTimes = data.leaveTimes
			.filter((lt: LeaveTimeInfo) => lt.isActive)
			.map((lt: LeaveTimeInfo) => new LeaveTime(lt, this.limitInfo, this.companyInfo.rate));
	}
}
