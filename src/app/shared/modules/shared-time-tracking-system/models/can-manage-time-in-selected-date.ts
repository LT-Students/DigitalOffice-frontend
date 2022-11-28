import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { PortalInfoService } from '@app/services/portal-info.service';
import { LAST_DAY_TO_FILL_HOURS } from '@shared/modules/shared-time-tracking-system/models/constants';

@Injectable()
export class CanManageTimeInSelectedDate {
	private readonly selectedDate = new BehaviorSubject(DateTime.now());
	public readonly selectedDate$ = this.selectedDate.asObservable();

	private readonly canEdit = new BehaviorSubject(this.canEditTime());
	public readonly canEdit$ = this.canEdit.asObservable();

	public readonly minDate$ = this.portalInfo.portal$.pipe(map((portal) => DateTime.fromISO(portal.createdAtUtc)));

	constructor(private portalInfo: PortalInfoService) {}

	public setNewDate(date: DateTime): void {
		this.selectedDate.next(date);
		this.canEdit.next(this.canEditTime());
	}

	private canEditTime(): boolean {
		const currentDate = DateTime.now();
		const selectedDate = this.selectedDate.value;
		return (
			currentDate.year < selectedDate.year ||
			(currentDate.year === selectedDate.year &&
				(currentDate.month <= selectedDate.month ||
					(currentDate.day <= LAST_DAY_TO_FILL_HOURS && currentDate.month === selectedDate.month + 1)))
		);
	}

	public getSelectedDate$(): Observable<DateTime> {
		return this.selectedDate$.pipe(first());
	}
}
