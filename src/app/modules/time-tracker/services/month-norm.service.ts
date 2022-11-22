import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { WorkTimeMonthLimitInfo } from '@api/time-service/models/work-time-month-limit-info';
import { TimeApiService } from './time-api.service';

@Injectable({
	providedIn: 'root',
})
export class MonthNormService {
	private normMap = new Map<string, number>();
	private readonly monthNorm = new BehaviorSubject<number>(160);
	public readonly monthNorm$ = this.monthNorm.asObservable();

	constructor(private timeApi: TimeApiService) {}

	public setMonthNorm(normHours: number, rate: number): void {
		this.monthNorm.next(normHours * rate);
	}

	public getMonthLimit(date: DateTime, rate = 1): Observable<WorkTimeMonthLimitInfo | null> {
		const monthId = `${date.month}_${date.year}`;
		const monthNorm = this.normMap.get(monthId);
		if (monthNorm) {
			this.setMonthNorm(monthNorm, rate);
			return of(null);
		}
		return this.timeApi.getMonthLimit(date).pipe(
			tap((limit: WorkTimeMonthLimitInfo | null) => {
				const normHours = limit?.normHours || 0;
				this.normMap.set(monthId, normHours);
				this.setMonthNorm(normHours, rate);
			})
		);
	}
}
