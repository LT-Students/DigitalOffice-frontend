import { IUserStatus } from '@app/models/user-status.model';

export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  middleName?: null | string;
  email?: string;
  status?: null | IUserStatus;
  photo?: null | string;
  isAdmin?: boolean;
  certificatesIds?: null | string[];
  achievementsIds?: null | string[];
  projectsCount?: number;
  level?: string;
  specialization?: string;
}
