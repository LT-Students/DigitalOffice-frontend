/* tslint:disable */
/* eslint-disable */
export interface CreateDepartmentRequest {

  /**
   * Department description.
   */
  description?: null | string;

  /**
   * Specific director user id this department.
   */
  directorUserId?: null | string;

  /**
   * Department name.
   */
  name: string;
  users?: Array<string>;
}

