/* tslint:disable */
/* eslint-disable */
export interface CreateWorkTimeRequest {

  /**
   * Description for alloted time.
   */
  description?: string;

  /**
   * Task finish deadline.
   */
  endTime: string;
  minutes: number;

  /**
   * The specify project's Id.
   */
  projectId: string;

  /**
   * Start date task execution.
   */
  startTime: string;

  /**
   * Short description of the task
   */
  title?: string;

  /**
   * User working on the current project.
   */
  userId: string;
}

