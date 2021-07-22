/* tslint:disable */
/* eslint-disable */
import { TaskInfo } from './task-info';
export interface FindResponseTaskInfo {
  body?: Array<TaskInfo>;
  errors?: Array<string>;

  /**
   * Total number of finded by filter task.
   */
  totalCount?: number;
}

