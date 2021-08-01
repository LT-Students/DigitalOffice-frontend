/* tslint:disable */
/* eslint-disable */
import { ProjectStatusType } from './project-status-type';
export interface ProjectInfo {
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

