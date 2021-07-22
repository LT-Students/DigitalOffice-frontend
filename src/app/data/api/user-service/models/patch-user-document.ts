/* tslint:disable */
/* eslint-disable */
export interface PatchUserDocument {

  /**
   * The operation to be performed.
   */
  op: 'add' | 'replace' | 'delete';

  /**
   * A JSON-Pointer.
   */
  path: '/FirstName' | '/LastName' | '/MiddleName' | '/Gender' | '/DateOfBirth' | '/City' | '/AvatarImage' | '/Status' | '/StartWorkingAt' | '/Rate' | '/DepartmentId' | '/PositionId' | '/RoleId' | '/OfficeId' | '/About' | '/IsActive';

  /**
   * The value to be used within the operations.
   */
  value?: {  };
}

