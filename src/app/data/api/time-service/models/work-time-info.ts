/* tslint:disable */
/* eslint-disable */
import { ProjectInfo } from './project-info';
import { UserInfo } from './user-info';
import { WorkTimeJobInfoInfo } from './work-time-job-info-info';
import { WorkTimeMonthLimitInfo } from './work-time-month-limit-info';
export interface WorkTimeInfo {
  day?: null | number;

  /**
   * Description for alloted time.
   */
  description?: string;

  /**
   * The work time Id.
   */
  id?: string;
  jobs?: null | Array<WorkTimeJobInfoInfo>;
  limitInfo?: WorkTimeMonthLimitInfo;
  managerHours?: null | number;
  modifiedAtUtc?: string;
  month?: number;
  project?: ProjectInfo;
  user?: UserInfo;
  userHours?: null | number;
  year?: number;
}

