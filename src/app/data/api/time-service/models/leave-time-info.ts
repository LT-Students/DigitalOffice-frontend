/* tslint:disable */
/* eslint-disable */
export interface LeaveTimeInfo {

  /**
   * Description for alloted time.
   */
  comment?: string;
  createdAt?: string;
  createdBy?: string;

  /**
   * Task finish deadline.
   */
  endTime?: string;

  /**
   * The leave time Id.
   */
  id?: string;

  /**
   * The reason for which lost time.
   */
  leaveType?: 'Vacation' | 'SickLeave' | 'Training' | 'Idle';
  minutes?: number;

  /**
   * Start date task execution.
   */
  startTime?: string;
  userId?: string;
}

