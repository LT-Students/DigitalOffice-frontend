/* tslint:disable */
/* eslint-disable */
import { TaskInfo } from './task-info';
export interface TasksResponse {
  body?: Array<TaskInfo>;
  errors?: Array<string>;

  /**
   * Total number of finded by filter tasks.
   */
  totalCount?: number;
}

