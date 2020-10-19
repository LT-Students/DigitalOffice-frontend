export * from './leaveTime.service';
import { LeaveTimeService } from './leaveTime.service';
export * from './workTime.service';
import { WorkTimeService } from './workTime.service';
export const APIS = [LeaveTimeService, WorkTimeService];
