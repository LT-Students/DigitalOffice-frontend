/* tslint:disable */
/* eslint-disable */
import { Department } from './department';
import { User } from './user';
export interface NewsResponse {
  author?: User;
  content?: string;
  createdAt?: string;
  department?: null | Department;
  id?: string;
  isActive?: boolean;
  sender?: User;
  subject?: string;
}

