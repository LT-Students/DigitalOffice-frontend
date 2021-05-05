/* tslint:disable */
/* eslint-disable */
export interface TaskInfo {

  /**
   * The task's assigned user Id.
   */
  'AssignedTo   '?: string;

  /**
   * The task's author Id.
   */
  authorId?: string;

  /**
   * Data and time created task.
   */
  createdAt?: any;

  /**
   * Data and time deadline task.
   */
  deadline?: any;

  /**
   * The task's description.
   */
  description?: string;

  /**
   * The task's Id.
   */
  id?: string;

  /**
   * The task's name.
   */
  name?: string;

  /**
   * Specific task's number.
   */
  'Number '?: number;

  /**
   * The task's parent Id.
   */
  'ParentId '?: string;

  /**
   * Planed time at completed task.
   */
  plannedMinutes?: number;

  /**
   * The task's priority Id.
   */
  'PriorityId '?: string;

  /**
   * The task's project Id.
   */
  'ProjectId '?: string;

  /**
   * The task's status Id.
   */
  'StatusId '?: string;

  /**
   * The task's type Id.
   */
  typeId?: string;
}

