/* tslint:disable */
/* eslint-disable */
export interface ProjectExpandedResponse {

  /**
   * Id of the department that funds the project.
   */
  departmentId: string;

  /**
   * The project's description.
   */
  description?: string;

  /**
   * The project's Id.
   */
  id: string;

  /**
   * Analogue the IsCompleted mark. Allows to search for the completed projects.
   */
  isActive: boolean;

  /**
   * The project's title.
   */
  name: string;
}

