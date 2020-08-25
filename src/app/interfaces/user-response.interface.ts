import { IAchievementResponse } from './achievement-response.interface';

export interface IUserResponse {
    userId: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    status: string;
    avatarId: string;
    certificatesIds: string;
    achievmentsIds: IAchievementResponse;
    isAdmin: boolean;
}

export interface IUser{
  firstName: string;
  lastName: string;
  photo: any;
}
