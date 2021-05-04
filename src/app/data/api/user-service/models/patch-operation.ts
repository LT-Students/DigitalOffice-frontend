/* tslint:disable */
/* eslint-disable */
export interface PatchOperation {

  /**
   * The operation to be performed.
   */
  op: 'add' | 'remove' | 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/FirstName' | '/LastName' | '/MiddleName' | '/AvatarImage' | '/Status' | '/Certificates' | '/Rate';

  /**
   * The value to be used within the operations.
   */
  value?: {  };
}

