/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ProjectStatusType } from './project-status-type';
export interface ProjectInfo {

  /**
   * Data and time created project.
   */
  createdAtUtc?: any;

  /**
   * Unique project creater identifier.
   */
  createdBy?: string;
  department?: null | DepartmentInfo;
  description?: null | string;

  /**
   * Unique project identifier.
   */
  id?: string;

  /**
   * Project name.
   */
  name?: string;
  shortDescription?: null | string;

  /**
   * Project short name.
   */
  shortName?: null | string;
  status?: ProjectStatusType;
}

