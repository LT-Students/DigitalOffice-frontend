/* tslint:disable */
/* eslint-disable */
import { ProjectInfo } from './project-info';
export interface WorkTimeInfo {
  createdAt?: string;
  createdBy?: string;

  /**
   * Description for alloted time.
   */
  description?: string;

  /**
   * Task finish deadline.
   */
  endTime?: string;

  /**
   * The work time Id.
   */
  id?: string;
  minutes?: number;
  project?: ProjectInfo;

  /**
   * Start date task execution.
   */
  startTime?: string;

  /**
   * Short description of the task
   */
  title?: string;
  userId?: string;
}

