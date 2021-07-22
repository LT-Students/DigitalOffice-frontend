/* tslint:disable */
/* eslint-disable */
import { TaskPropertyInfo } from './task-property-info';
export interface FindResponseTaskProperty {
  body?: Array<TaskPropertyInfo>;
  errors?: Array<string>;

  /**
   * Total number of finded by filter task property.
   */
  totalCount?: number;
}

