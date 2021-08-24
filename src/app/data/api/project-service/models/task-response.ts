/* tslint:disable */
/* eslint-disable */
import { ProjectInfo } from './project-info';
import { ProjectUserInfo } from './project-user-info';
import { TaskInfo } from './task-info';
import { TaskPropertyInfo } from './task-property-info';
export interface TaskResponse {
  assignedUser?: null | ProjectUserInfo;

  /**
   * Task creator.
   */
  author?: ProjectUserInfo;

  /**
   * Data and time created task.
   */
  createdAt?: any;
  description?: null | string;
  id?: string;
  name?: string;
  number?: number;
  parentTask?: null | TaskInfo;
  plannedMinutes?: null | number;
  priority?: TaskPropertyInfo;
  project?: ProjectInfo;
  status?: TaskPropertyInfo;
  subtasks?: null | Array<TaskInfo>;
  type?: TaskPropertyInfo;
}

