import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { SortDirection } from '@angular/material/sort';
import { getUTCWithOffset, MAX_INT32 } from '@app/utils/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { LeaveTimePath, PatchDocument } from '@app/types/edit-request';
import { TimeService } from '../services/time.service';
import { LeaveTime, LeaveTimeFactory, UserStat } from './user-stat';
import { TimelistEntityType } from './timelist-entity';

export class TimeListDataSource extends DataSource<UserStat> {
	private data = new BehaviorSubject<UserStat[]>([]);

	constructor(data: UserStat[], private apiService: TimeService, private entityType: TimelistEntityType) {
		super();
		this.data.next(data);
	}

	connect(collectionViewer: CollectionViewer): Observable<UserStat[]> {
		return this.data.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {}

	public loadStats(
		entityId: string,
		month: number,
		year: number,
		sort: SortDirection,
		name: string
	): Observable<UserStat[]> {
		const sortOrder = this.getSortOrder(sort);
		return this.apiService
			.findStats(this.entityType, entityId, {
				month,
				year,
				skipCount: 0,
				takeCount: MAX_INT32,
				ascendingsort: sortOrder,
				nameincludesubstring: name || undefined,
			})
			.pipe(tap((data: UserStat[]) => this.data.next(data)));
	}

	public updateWorkTimeHours(workTime: WorkTimeInfo, hours: number): void {
		const oldData = this.data.value;
		const newData = oldData.map((s: UserStat) => {
			const wt = s.workTimes.find((wt: WorkTimeInfo) => wt.id === workTime.id);
			if (wt) {
				return {
					...s,
					workTimes: s.workTimes.map((wt: WorkTimeInfo) =>
						wt.id === workTime.id ? { ...wt, userHours: hours, managerHours: hours } : wt
					),
				};
			}
			return s;
		});
		this.data.next(newData);
		this.apiService.editWorkTime(workTime.id, hours, '/Hours').subscribe({ error: () => this.data.next(oldData) });
	}

	public updateWorkTimeComment(workTime: WorkTimeInfo, comment: string): void {
		const oldData = this.data.value;
		const newData = oldData.map((s: UserStat) => {
			const wt = s.workTimes.find((wt: WorkTimeInfo) => wt.id === workTime.id);
			if (wt) {
				return {
					...s,
					workTimes: s.workTimes.map((wt: WorkTimeInfo) =>
						wt.id === workTime.id ? { ...wt, description: comment, managerDescription: comment } : wt
					),
				};
			}
			return s;
		});
		this.data.next(newData);
		this.apiService
			.editWorkTime(workTime.id, comment, '/Description')
			.subscribe({ error: () => this.data.next(oldData) });
	}

	public addLeaveTime(): void {}

	public updateLeaveTimeDates(
		leaveTime: LeaveTime,
		{ startDate, endDate }: { startDate: DateTime; endDate: DateTime }
	): void {
		const oldData = this.data.value;
		const isStartDateChanged = +leaveTime.startDate !== +startDate;
		const isEndDateChanged = +leaveTime.endDate !== +endDate;
		if (!isStartDateChanged && !isEndDateChanged) {
			return;
		}
		const rate = oldData.find((s: UserStat) => s.leaveTimes.some((lt: LeaveTime) => lt.id === leaveTime.id))
			?.companyInfo.rate as number;
		const newHours = LeaveTimeFactory.countHours({ startDate, endDate }, oldData[0].limitInfo, rate);
		const newData = oldData.map((s: UserStat) => {
			// if we have rate, then leave time with such id exist
			if (rate) {
				return {
					...s,
					leaveTimes: s.leaveTimes.map((lt: LeaveTime) =>
						lt.id === leaveTime.id ? { ...lt, startDate, endDate, hours: newHours } : lt
					),
				};
			}
			return s;
		});

		this.data.next(newData);
		const editRequest = [];
		if (isStartDateChanged) {
			editRequest.push(new PatchDocument(getUTCWithOffset(startDate), LeaveTimePath.START_TIME));
		}
		if (isEndDateChanged) {
			editRequest.push(new PatchDocument(getUTCWithOffset(endDate), LeaveTimePath.END_TIME));
		}
		if (leaveTime.hours !== newHours) {
			editRequest.push(new PatchDocument(newHours * 60, LeaveTimePath.MINUTES));
		}
		if (editRequest.length) {
			this.apiService
				.editLeaveTime(leaveTime.id, editRequest)
				.subscribe({ error: () => this.data.next(oldData) });
		}
	}

	public updateLeaveTimeComment(leaveTime: LeaveTime, comment: string): void {
		const oldData = this.data.value;
		const newData = oldData.map((s: UserStat) => {
			const wt = s.leaveTimes.find((lt: LeaveTime) => lt.id === leaveTime.id);
			if (wt) {
				return {
					...s,
					leaveTimes: s.leaveTimes.map((lt: LeaveTime) => (lt.id === leaveTime.id ? { ...lt, comment } : lt)),
				};
			}
			return s;
		});
		this.data.next(newData);
		this.apiService
			.editLeaveTime(leaveTime.id, new PatchDocument(comment, LeaveTimePath.COMMENT))
			.subscribe({ error: () => this.data.next(oldData) });
	}

	public deleteLeaveTime(leaveTimeId: string): void {
		const oldData = this.data.value;
		const newData = oldData.map((s: UserStat) => {
			const ltToDelete = s.leaveTimes.some((lt: LeaveTime) => lt.id === leaveTimeId);
			if (ltToDelete) {
				return {
					...s,
					leaveTimes: s.leaveTimes.filter((lt: LeaveTime) => lt.id !== leaveTimeId),
				};
			}
			return s;
		});
		this.data.next(newData);
		this.apiService.deleteLeaveTime(leaveTimeId).subscribe({ error: () => this.data.next(oldData) });
	}

	private getSortOrder(sort: SortDirection): boolean {
		return sort === 'asc';
	}
}
