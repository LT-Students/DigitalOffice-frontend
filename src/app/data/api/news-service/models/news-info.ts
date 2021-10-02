/* tslint:disable */
/* eslint-disable */
import { Department } from './department';
import { User } from './user';
export interface NewsInfo {
  author?: User;
  createdAtUtc?: string;
  department?: null | Department;
  id?: string;
  isActive?: boolean;
  preview?: string;
  pseudonym?: string;
  sender?: User;
  subject?: string;
}

