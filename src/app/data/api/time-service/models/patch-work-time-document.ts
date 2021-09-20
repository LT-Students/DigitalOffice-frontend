/* tslint:disable */
/* eslint-disable */
export interface PatchWorkTimeDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/UserHours' | '/ManagerHours' | '/Description';

  /**
   * The value to be used within the operations.
   */
  value?: {  };
}

