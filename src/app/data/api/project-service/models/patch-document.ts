/* tslint:disable */
/* eslint-disable */
export interface PatchDocument {

  /**
   * The operation to be performed
   */
  op: 'replace' | 'add' | 'remove';

  /**
   * A JSON-Pointer.
   */
  path: '/Name' | '/Description' | '/AssignedTo' | '/PriorityId' | '/StatusId' | '/TypeId' | '/PlannedMinutes';

  /**
   * The value to be used within the operations.
   */
  value: {  };
}

