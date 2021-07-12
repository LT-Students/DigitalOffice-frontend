/* tslint:disable */
/* eslint-disable */
import { ProjectTaskInfo } from './project-task-info';
import { UserTaskInfo } from './user-task-info';
export interface TaskInfo {
  assignedTo?: UserTaskInfo;

  /**
   * Task creator.
   */
  author?: UserTaskInfo;

  /**
   * Data and time created task.
   */
  createdAt?: any;

  /**
   * The task's description.
   */
  description?: string;

  /**
   * Unique task identifier.
   */
  id?: string;

  /**
   * The task's name.
   */
  name?: string;

  /**
   * Specific task's number.
   */
  number?: number;

  /**
   * Planed time at completed task.
   */
  plannedMinutes?: number;

  /**
   * The task's priority name.
   */
  priorityName?: string;
  project?: ProjectTaskInfo;

  /**
   * The task's status name.
   */
  statusName?: string;

  /**
   * The task's type name.
   */
  typeName?: string;
}

