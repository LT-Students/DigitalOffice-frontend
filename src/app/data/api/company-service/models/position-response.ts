/* tslint:disable */
/* eslint-disable */
import { Position } from './position';
export interface PositionResponse {
  info?: Position;

  /**
   * List specific users id.
   */
  userIds?: Array<string>;
}

