import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITimePeriod } from './attendance.component';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor() {
  }

  countPlannedHours(period: ITimePeriod): number {
    if (!period.to) {
      return 8;
    }

  }
}
