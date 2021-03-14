/* tslint:disable */
/* eslint-disable */
export interface WorkTimeRequest {
  /**
   * Description for alloted time.
   */
  description?: string;

  /**
   * Task finish deadline.
   */
  endTime: string;

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
  title: string;

  /**
   * Users working on the current project.
   */
  workerUserId: string;
}
