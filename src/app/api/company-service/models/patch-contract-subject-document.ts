/* tslint:disable */
/* eslint-disable */
export interface PatchContractSubjectDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/name' | '/description' | '/isactive';

  /**
   * The value to be used within the operations.
   */
  value?: {
};
}

