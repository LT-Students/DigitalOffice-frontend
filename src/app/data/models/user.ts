import { IUserStatus } from '@app/models/user/user-status.model';
/**
 * @deprecated The interface should not be used
 */
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
