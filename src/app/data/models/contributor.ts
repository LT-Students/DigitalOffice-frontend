import { Time } from '@angular/common';
import { IUser } from '@data/models/user';
/**
 * @deprecated The interface should not be used
 */
export interface Contributor {
  user: IUser;
  totalTime: Time;
}
