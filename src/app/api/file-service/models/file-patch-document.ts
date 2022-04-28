/* tslint:disable */
/* eslint-disable */
export interface FilePatchDocument {

  /**
   * The operation to be performed
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/Name' | '/Content';

  /**
   * The value to be used within the operations.
   */
  value: {
};
}

