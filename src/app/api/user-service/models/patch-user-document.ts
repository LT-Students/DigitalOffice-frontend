/* tslint:disable */
/* eslint-disable */
export interface PatchUserDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/FirstName' | '/LastName' | '/MiddleName' | '/Status' | '/IsAdmin' | '/DateOfBirth' | '/GenderId' | '/About' | '/BusinessHoursFromUtc' | '/BusinessHoursToUtc' | '/Latitude' | '/Longitude';

  /**
   * The value to be used within the operations.
   */
  value?: {
};
}

