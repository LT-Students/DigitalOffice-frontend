/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';
import { ProjectInfo } from './project-info';
import { ProjectUserInfo } from './project-user-info';
import { TaskInfo } from './task-info';
import { TaskPropertyInfo } from './task-property-info';
export interface TaskResponse {
  assignedUser?: null | ProjectUserInfo;

  /**
   * Data and time created task.
   */
  createdAtUtc?: any;

  /**
   * Task creator.
   */
  createdBy?: ProjectUserInfo;
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
  taskImages?: null | Array<ImageInfo>;
  type?: TaskPropertyInfo;
}

