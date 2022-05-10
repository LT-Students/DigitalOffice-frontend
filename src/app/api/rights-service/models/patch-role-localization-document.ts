/* tslint:disable */
/* eslint-disable */
export interface PatchRoleLocalizationDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/Name' | '/Description' | '/IsActive';

  /**
   * The value to be used within the operations.
   */
  value?: {
};
}

