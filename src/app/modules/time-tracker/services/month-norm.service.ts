import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MonthNormService {
	private readonly monthNorm = new BehaviorSubject<number>(160);
	public readonly monthNorm$ = this.monthNorm.asObservable();

	constructor() {}

	public setMonthNorm(normHours: number, rate: number): void {
		this.monthNorm.next(normHours * rate);
	}
}
