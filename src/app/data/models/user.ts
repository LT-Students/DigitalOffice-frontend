export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  middleName?: null | string;
  email?: string;
  status?: null | string;
  photo?: null | string;
  isAdmin?: boolean;
  certificatesIds?: null | string[];
  achievementsIds?: null | string[];
}
