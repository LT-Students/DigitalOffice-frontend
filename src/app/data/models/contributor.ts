import { Time } from '@angular/common';
import { User } from '@data/models/user';

export interface Contributor {
  user: User;
  totalTime: Time;
}
