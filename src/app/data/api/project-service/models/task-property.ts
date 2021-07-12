/* tslint:disable */
/* eslint-disable */
import { PropertyType } from './property-type';
export interface TaskProperty {

  /**
   * The task property description.
   */
  description?: string;

  /**
   * The task property name.
   */
  name: string;
  propertyType: PropertyType;
}

