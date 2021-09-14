import { Injectable } from "@angular/core";
import { DatePeriod } from "@data/models/date-period";
import { DateService } from "./date.service";

@Injectable({
    providedIn: 'root'
})
export class TimeDurationService {
    constructor(
        private _dateService: DateService
    ) { }

    public countMaxMonthDuration(year: number, month: number): number {
        const currentDatePeriod: DatePeriod = {
            startDate: new Date(year, month, 1),
            endDate: new Date(year, month + 1, 0),
        };
        return Number(this.getDuration(currentDatePeriod, 24));
    }

    public getDuration(datePeriod: DatePeriod, hoursPerDay: number = 8, skipHolidays = false, rate: number = 1): number {
        const daysArray: Date[] = [];

        if (datePeriod.endDate && this._dateService.isSameDay(datePeriod.startDate, datePeriod.endDate)) {
            return hoursPerDay * rate;
        } else {
            const startDate = new Date(datePeriod.startDate as Date);
            const endDate = new Date(datePeriod.endDate as Date);

            while (startDate.getDate() !== endDate.getDate()) {
                daysArray.push(new Date(startDate));
                startDate.setDate(startDate.getDate() + 1);
            }

            if (skipHolidays) {
                return (daysArray.filter((day: Date) => day.getDay() !== 6 && day.getDay() !== 0).length + 1) * hoursPerDay * rate;
            } else {
                return (daysArray.length + 1) * hoursPerDay * rate;
            }
        }
    }
}