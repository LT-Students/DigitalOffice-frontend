/* tslint:disable */
/* eslint-disable */
export interface PositionResponse {
  /**
   * Position description.
   */
  description?: null | string;

  /**
   * Marks whether position is active or not.
   */
  isActive?: boolean;

  /**
   * Position name.
   */
  name?: string;

  /**
   * List of users ids that have this position.
   */
  userIds?: Array<string>;
}
