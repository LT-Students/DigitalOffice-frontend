/* tslint:disable */
/* eslint-disable */
export interface PatchOperation {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/Content' | '/Subject' | '/IsActive';

  /**
   * The value to be used within the operations.
   */
  value: {  };
}

