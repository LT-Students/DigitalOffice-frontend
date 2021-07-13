/* tslint:disable */
/* eslint-disable */
export interface CreateTaskRequest {
  assignedTo?: string;
  authorId?: string;
  description?: string;
  name: string;
  parentId?: string;
  plannedMinutes?: number;
  priorityId: string;
  projectId: string;
  statusId: string;
  typeId: string;
}

