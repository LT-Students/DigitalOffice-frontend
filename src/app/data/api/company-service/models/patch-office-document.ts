/* tslint:disable */
/* eslint-disable */
export interface PatchOfficeDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/Name' | '/City' | '/Address';

  /**
   * The value to be used within the operations.
   */
  value: {  };
}

