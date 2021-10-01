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
   * Unique project creator identifier.
   */
  createdBy?: string;
  department?: null | DepartmentInfo;

  /**
   * Project description.
   */
  description?: null | string;

  /**
   * Unique project identifier.
   */
  id?: string;

  /**
   * Project name.
   */
  name?: string;

  /**
   * Project short description.
   */
  shortDescription?: null | string;

  /**
   * Project short name.
   */
  shortName?: null | string;
  status?: ProjectStatusType;
}

