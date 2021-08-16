/* tslint:disable */
/* eslint-disable */
import { ProjectInfo } from './project-info';
import { WorkTimeJobInfoInfo } from './work-time-job-info-info';
export interface WorkTimeInfo {

  /**
   * Description for alloted time.
   */
  description?: string;

  /**
   * The work time Id.
   */
  id?: string;
  jobs?: null | Array<WorkTimeJobInfoInfo>;
  managerHours?: null | number;
  month?: number;
  project?: ProjectInfo;
  userHours?: null | number;
  userId?: string;
  year?: number;
}

