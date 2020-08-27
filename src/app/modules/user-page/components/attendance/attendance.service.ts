import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITimePeriod } from '../../../../interfaces/time-period.interface';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private ONE_DAY = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  constructor() {
  }

  countPlannedHours(period: ITimePeriod): number {
    let daysArray: Date[] = [];

    if (!period.to) {
      return 8;
    } else {
      let from = period.from;
      let to = period.to;

      while (from.getDate() !== to.getDate()) {
        console.log('from: ' + from.getDate());
        daysArray.push(from);
        from.setDate(from.getDate() + 1);
        console.log(from);
      }
      console.log(daysArray);
    }

  }

  private countDaysBetween(period: ITimePeriod) {
    return Math.round(Math.abs((period.from - period.to) / this.ONE_DAY));
  }
}
