import { Time } from '@angular/common';
import { IUser } from '@data/models/user';

export interface Contributor {
  user: IUser;
  totalTime: Time;
}
