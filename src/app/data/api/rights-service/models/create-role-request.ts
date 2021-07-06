/* tslint:disable */
/* eslint-disable */
export interface CreateRoleRequest {

  /**
   * Role description.
   */
  description?: null | string;

  /**
   * Role name.
   */
  name: string;

  /**
   * Number of rights.
   */
  rights: Array<number>;
}

