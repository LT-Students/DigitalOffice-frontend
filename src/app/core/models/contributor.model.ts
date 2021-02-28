import { Time } from '@angular/common';

import { User } from '@digital-office/api/user-service';

export interface Contributor {
  // project: IProject;
  user: User;
  totalTime: Time;
}
