/* tslint:disable */
/* eslint-disable */
import { ProjectClosedReason } from './project-closed-reason';
export interface Project {

  /**
   * Project closing time. May be empty if the project is not closed.
   */
  closedAt?: any;
  closedReason?: ProjectClosedReason;
  createdAt?: any;
  departmentId?: string;
  description?: string;
  id?: string;
  isActive?: boolean;
  name?: string;
  shortName?: string;
}

