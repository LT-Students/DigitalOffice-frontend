/* tslint:disable */
/* eslint-disable */
import { ProjectInfo } from './project-info';
import { UserInfo } from './user-info';
import { WorkTimeJobInfoInfo } from './work-time-job-info-info';
export interface WorkTimeInfo {
	day?: number;

	/**
	 * Description for alloted time.
	 */
	description?: string;

	/**
	 * The work time Id.
	 */
	id: string;
	jobs?: Array<WorkTimeJobInfoInfo>;
	manager?: UserInfo;

	/**
	 * Description for alloted time.
	 */
	managerDescription?: string;
	managerHours?: number;
	modifiedAtUtc?: string;
	month: number;
	project?: ProjectInfo;
	userHours?: number;
	year: number;
}
