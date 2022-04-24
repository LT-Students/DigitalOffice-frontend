/* tslint:disable */
/* eslint-disable */
import { ProjectInfo } from './project-info';
import { WorkTimeJobInfoInfo } from './work-time-job-info-info';
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

  /**
   * Description for alloted time.
   */
  managerDescription?: string;
  managerHours?: null | number;
  modifiedAtUtc?: null | string;
  month?: number;
  project?: ProjectInfo;
  userHours?: null | number;
  year?: number;
}

