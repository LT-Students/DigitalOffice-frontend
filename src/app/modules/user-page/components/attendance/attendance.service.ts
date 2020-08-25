import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITimePeriod } from '../../../../interfaces/time-period.interface';

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
