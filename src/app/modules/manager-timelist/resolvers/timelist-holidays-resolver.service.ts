import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { Holidays } from '@shared/modules/shared-time-tracking-system/models';
import { TimeApiService } from '../services';

@Injectable({
	providedIn: 'root',
})
export class TimelistHolidaysResolver implements Resolve<Holidays[]> {
	constructor(private api: TimeApiService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Holidays[]> {
		const currentMonth = DateTime.now();
		const prevMonth = currentMonth.minus({ month: 1 });
		const nextMonth = currentMonth.plus({ month: 1 });

		return forkJoin([
			this.api.findHolidays(currentMonth.month, currentMonth.year),
			this.api.findHolidays(prevMonth.month, prevMonth.year),
			this.api.findHolidays(nextMonth.month, nextMonth.year),
		]);
	}
}
