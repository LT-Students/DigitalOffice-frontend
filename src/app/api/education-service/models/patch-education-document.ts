/* tslint:disable */
/* eslint-disable */
export interface PatchEducationDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/UniversityName' | '/QualificationName' | '/EducationFormId' | '/EducationTypeId' | '/Completeness' | '/AdmissiomAt' | '/IssueAt' | '/IsActive';

  /**
   * The value to be used within the operations.
   */
  value: {
};
}

