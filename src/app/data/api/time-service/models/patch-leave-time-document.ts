/* tslint:disable */
/* eslint-disable */
export interface PatchLeaveTimeDocument {

  /**
   * The operation to be performed.
   */
  op: 'replace';

  /**
   * A JSON-Pointer.
   */
  path: '/Minutes' | '/StartTime' | '/EndTime' | '/LeaveType' | '/Comment' | '/IsActive';

  /**
   * The value to be used within the operations.
   */
  value?: {  };
}

