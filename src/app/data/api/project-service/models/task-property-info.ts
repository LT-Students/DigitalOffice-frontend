/* tslint:disable */
/* eslint-disable */
import { PropertyType } from './property-type';
export interface TaskPropertyInfo {

  /**
   * Unique author Id task property identifier.
   */
  authorId?: null | string;

  /**
   * Data and time created task property.
   */
  createdAt?: any;

  /**
   * The task property description.
   */
  description?: null | string;

  /**
   * Unique task property identifier.
   */
  id?: string;

  /**
   * Task property is active.
   */
  isActive?: any;

  /**
   * The task property name.
   */
  name?: string;

  /**
   * Unique project Id task property identifier.
   */
  projectId?: null | string;
  propertyType?: PropertyType;
}

