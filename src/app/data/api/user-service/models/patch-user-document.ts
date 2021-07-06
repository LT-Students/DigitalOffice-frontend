/* tslint:disable */
/* eslint-disable */
export interface PatchUserDocument {

  /**
   * The operation to be performed.
   */
  op: 'add' | 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/FirstName' | '/LastName' | '/MiddleName' | '/Gender' | '/DateOfBirth' | '/City' | '/AvatarImage' | '/Status' | '/StartWorkingAt' | '/Rate';

  /**
   * The value to be used within the operations.
   */
  value?: {  };
}

