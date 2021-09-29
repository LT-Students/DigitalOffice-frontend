/* tslint:disable */
/* eslint-disable */
import { ImageContent } from './image-content';
export interface CreateTaskRequest {
  assignedTo?: string;
  description?: string;
  name: string;
  parentId?: null | string;
  plannedMinutes?: number;
  priorityId: string;
  projectId: string;
  statusId: string;
  taskImages: Array<ImageContent>;
  typeId: string;
}

