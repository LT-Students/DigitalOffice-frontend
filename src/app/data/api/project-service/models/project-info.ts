/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ProjectStatusType } from './project-status-type';
export interface ProjectInfo {

  /**
   * Unique project creater identifier.
   */
  authorId?: string;

  /**
   * Data and time created project.
   */
  createdAtUtc?: any;
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

