/* tslint:disable */
/* eslint-disable */
export interface PatchWorkTimeMonthLimitDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/NormHours' | '/Holidays';

  /**
   * The value to be used within the operations.
   */
  value?: {  };
}

