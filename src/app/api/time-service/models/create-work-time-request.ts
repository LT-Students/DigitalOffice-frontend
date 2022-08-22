/* tslint:disable */
/* eslint-disable */
export interface CreateWorkTimeRequest {
  description?: string;
  hours?: number;
  month: number;

  /**
   * User's timezone offset. Must be in [-12,12] interval.
   */
  offset: number;
  year: number;
}

