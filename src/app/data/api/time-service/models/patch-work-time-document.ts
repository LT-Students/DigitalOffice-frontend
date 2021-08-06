/* tslint:disable */
/* eslint-disable */
export interface PatchWorkTimeDocument {

  /**
   * The operation to be performed.
   */
  op: 'add' | 'replace' | 'delete';

  /**
   * A JSON-Pointer.
   */
  path: '/Minutes' | '/ProjectId' | '/Title' | '/Description' | '/StartTime' | '/EndTime';

  /**
   * The value to be used within the operations.
   */
  value?: {  };
}

