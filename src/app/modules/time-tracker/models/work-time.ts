import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { WorkTimeResponse } from '@api/time-service/models/work-time-response';
import { WorkTimeJobInfoInfo } from '@api/time-service/models/work-time-job-info-info';
import { ProjectInfo } from '@api/time-service/models/project-info';
import { WorkTimeMonthLimitInfo } from '@api/time-service/models/work-time-month-limit-info';
import { UserInfo } from '@api/time-service/models/user-info';
import { isGUIDEmpty } from '@app/utils/utils';
import { ProjectStatusType } from '@api/time-service/models/project-status-type';
import { DateTime } from 'luxon';

export class WorkTime implements WorkTimeInfo {
	public id: string;
	public month: number;
	public year: number;
	public day?: number;
	public userHours: number;
	public managerHours?: number;
	public description?: string;
	public modifiedAtUtc?: string;
	public modifiedAt?: DateTime;
	public jobs?: Array<WorkTimeJobInfoInfo>;
	public managerDescription?: string;
	public project: ProjectInfo;
	public limitInfo: WorkTimeMonthLimitInfo;
	public user?: UserInfo;
	public manager?: UserInfo;

	public get hours(): number {
		return this.managerHours || this.userHours;
	}

	constructor({ workTime, limitInfo, user }: WorkTimeResponse) {
		this.id = workTime.id;
		this.month = workTime.month;
		this.year = workTime.year;
		this.day = workTime.day;
		this.userHours = workTime.userHours || 0;
		this.managerHours = workTime.managerHours;
		this.description = workTime.description;
		this.modifiedAtUtc = workTime.modifiedAtUtc;
		if (workTime.modifiedAtUtc != null) {
			this.modifiedAt = DateTime.fromISO(workTime.modifiedAtUtc, { zone: 'utc' }).setZone('local');
		}
		this.jobs = workTime.jobs;
		this.managerDescription = workTime.managerDescription;
		this.limitInfo = limitInfo;
		this.user = user;
		this.manager = workTime.manager;

		const project = workTime.project as ProjectInfo;
		this.project = isGUIDEmpty(project.id)
			? { id: project.id, name: 'Другое', shortName: 'Другое', status: ProjectStatusType.Active }
			: project;
	}
}
