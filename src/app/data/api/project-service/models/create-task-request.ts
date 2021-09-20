/* tslint:disable */
/* eslint-disable */
export interface CreateTaskRequest {
  assignedTo?: string;
  description?: string;
  name: string;
  parentId?: null | string;
  plannedMinutes?: number;
  priorityId: string;
  projectId: string;
  statusId: string;
  typeId: string;
}

