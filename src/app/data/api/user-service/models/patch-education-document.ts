/* tslint:disable */
/* eslint-disable */
export interface PatchEducationDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace' | 'add';

  /**
   * A JSON-Pointer.
   */
  path: '/UniversityName' | '/QualificationName' | '/FormEducation' | '/AdmissiomAt' | '/IssueAt' | '/IsActive';

  /**
   * The value to be used within the operations.
   */
  value: {  };
}

