/* tslint:disable */
/* eslint-disable */
export interface PatchDepartmentDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/name' | '/description' | '/isactive' | '/directorid';

  /**
   * The value to be used within the operations.
   */
  value: {
};
}

