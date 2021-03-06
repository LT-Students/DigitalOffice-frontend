import { Time } from '@angular/common';
import { User } from '@data/api/user-service/models/user';

export interface Contributor {
  user: User;
  totalTime: Time;
}
