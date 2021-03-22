import { Task } from './task';

export interface Project {
  id: string;
  name: string;
  shortName: string;
  description: string;
  departmentId: string;
  isActive: boolean;
  tasks?: Partial<Task>[];
}
