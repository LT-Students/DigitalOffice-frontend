/* tslint:disable */
/* eslint-disable */
export interface PatchWorkTimeDayJobDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/WorkTimeId' | '/Day' | '/Name' | '/Description' | '/Minutes' | '/IsActive';

  /**
   * The value to be used within the operations.
   */
  value?: {
};
}

