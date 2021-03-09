/* tslint:disable */
/* eslint-disable */
export interface ProjectRequest {

  /**
   * Project closed reason. May be empty if the project is not closed.
   */
  closedReason?: number;
  departmentId: string;
  description: string;
  id?: string;
  isActive: boolean;
  name: string;
  shortName: string;
}

