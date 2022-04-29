/* tslint:disable */
/* eslint-disable */
export interface PatchCompanyUserDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/contracttermtype' | '/contractsubjectid' | '/rate' | '/startworkingat' | '/endworkingat' | '/probation';

  /**
   * The value to be used within the operations.
   */
  value?: {
};
}

