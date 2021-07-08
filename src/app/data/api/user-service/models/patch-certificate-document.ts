/* tslint:disable */
/* eslint-disable */
export interface PatchCertificateDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/UserId' | '/Name' | '/SchoolName' | '/EducationType' | '/ReceivedAt' | '/IsActive' | '/Image';

  /**
   * The value to be used within the operations.
   */
  value: {  };
}

