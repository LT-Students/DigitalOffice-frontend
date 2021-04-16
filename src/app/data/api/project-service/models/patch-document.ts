/* tslint:disable */
/* eslint-disable */
export interface PatchDocument {

  /**
   * A string containing a JSON Pointer value.
   */
  from?: string;

  /**
   * The operation to be performed
   */
  op: 'add' | 'remove' | 'replace';

  /**
   * A JSON-Pointer
   */
  path: string;

  /**
   * The value to be used within the operations.
   */
  value: {  };
}

