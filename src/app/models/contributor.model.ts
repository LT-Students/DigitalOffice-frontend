import { Time } from '@angular/common';

import { UserResponse } from '../../../libs/api/src/lib/user-service';

export interface Contributor {
    // project: IProject;
    user: UserResponse;
    totalTime: Time;
}
