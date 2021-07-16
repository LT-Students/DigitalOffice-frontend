/* tslint:disable */
/* eslint-disable */
export interface PatchCompanyDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/portalname' | '/companyname' | '/siteurl' | '/tagline' | '/description' | '/logo' | '/host' | '/port' | '/enablessl' | '/email' | '/password';

  /**
   * The value to be used within the operations.
   */
  value?: {  };
}

