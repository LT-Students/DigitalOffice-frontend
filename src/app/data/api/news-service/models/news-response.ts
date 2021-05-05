/* tslint:disable */
/* eslint-disable */
import { User } from './user';
export interface NewsResponse {
  author?: User;
  content?: string;
  createdAt?: string;
  id?: string;
  sender?: User;
  subject?: string;
}

