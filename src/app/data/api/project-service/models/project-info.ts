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
  createdAt?: any;
  department?: DepartmentInfo;
  description?: string;

  /**
   * Unique project identifier.
   */
  id?: string;

  /**
   * Project name.
   */
  name?: string;
  shortDescription?: string;

  /**
   * Project short name.
   */
  shortName?: string;
  status?: ProjectStatusType;
}

