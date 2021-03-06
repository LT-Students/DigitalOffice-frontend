/* tslint:disable */
/* eslint-disable */
export interface ProjectResponse {

  /**
   * Date and time of project closed (maybe the value 'null').
   */
  closedAt?: any;

  /**
   * Date and time of project creation.
   */
  createAt?: any;

  /**
   * Id of the department that funds the project.
   */
  departmentId?: string;

  /**
   * The project's description.
   */
  description?: string;

  /**
   * The project's Id.
   */
  id?: string;

  /**
   * Analogue the IsCompleted mark. Allows to search for the completed projects.
   */
  isActive?: boolean;

  /**
   * The project's title.
   */
  name?: string;

  /**
   * The project short name.
   */
  shortName?: any;
}

