import { Contributor } from '@data/models/contributor';
import { Company } from '@data/models/company';
import { Task } from './task';

export interface Project {
  id: string;
  name: string;
  shortName: string;
  description: string;
  departmentId: string;
  isActive: boolean;
  tasks?: Partial<Task>[];
  consumer?: Company;
  contributors?: Contributor[];
  historyDetails?: string;
}
