/* tslint:disable */
/* eslint-disable */
export interface LeaveTimeRequest {

  /**
   * Description for alloted time.
   */
  comment?: string;

  /**
   * End time leave from task.
   */
  endLeave: string;

  /**
   * The reason for which lost time.
   */
  leaveType: number;

  /**
   * Start time leave from task.
   */
  startLeave: string;

  /**
   * Users working on the current project.
   */
  workerUserId: string;
}

