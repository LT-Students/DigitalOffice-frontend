import { WorkTime } from './work-time';

export interface Project {
  id: string;
  name: string;
  shortName: string;
  description: string;
  departmentId: string;
  isActive: boolean;
  workTime?: Partial<WorkTime>[];
}
