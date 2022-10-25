import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { SortDirection } from '@angular/material/sort';
import { getUTCWithOffset, MAX_INT32 } from '@app/utils/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { LeaveTimePath, PatchDocument } from '@app/types/edit-request';
import { User } from '@app/models/user/user.model';
import { TimeApiService } from '../services';
import { LeaveTime, LeaveTimeFactory, UserStat, WorkTime } from './user-stat';
import { TimelistEntityType } from './timelist-entity';

export class TimeListDataSource extends DataSource<UserStat> {
	private data = new BehaviorSubject<UserStat[]>([]);

	constructor(
		data: UserStat[],
		private apiService: TimeApiService,
		private entityType: TimelistEntityType,
		private currentUser: User
	) {
		super();
		this.data.next(data);
	}

	connect(collectionViewer: CollectionViewer): Observable<UserStat[]> {
		return this.data.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {}

	// TODO this is a temporary fix for scroll after updating timelist. Need to somehow refactor table to apply changes
	// in place
	private setDataWithScroll(data: UserStat[]): void {
		const scrollContainer = document.querySelector('.content-container') as HTMLElement;
		const scrollTop = scrollContainer.scrollTop;
		this.data.next(data);
		setTimeout(() => scrollContainer.scroll({ top: scrollTop }));
	}

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

	public updateWorkTimeHours(workTime: WorkTime, hours: number): void {
		const oldData = this.data.value;
		const newData = oldData.map((s: UserStat) => {
			const wt = s.workTimes.find((wt: WorkTime) => wt.id === workTime.id);
			if (wt) {
				return {
					...s,
					workTimes: s.workTimes.map((wt: WorkTime) => {
						if (wt.id !== workTime.id) {
							return wt;
						}
						return {
							...wt,
							...(wt.user.id === this.currentUser.id
								? { userHours: hours }
								: { managerHours: hours, manager: this.currentUser }),
						};
					}),
				};
			}
			return s;
		});
		this.setDataWithScroll(newData);
		this.apiService
			.editWorkTime(workTime.id, hours, '/Hours')
			.subscribe({ error: () => this.setDataWithScroll(oldData) });
	}

	public updateWorkTimeComment(workTime: WorkTime, comment: string): void {
		const oldData = this.data.value;
		const newData = oldData.map((s: UserStat) => {
			const wt = s.workTimes.find((wt: WorkTime) => wt.id === workTime.id);
			if (wt) {
				return {
					...s,
					workTimes: s.workTimes.map((wt: WorkTime) =>
						wt.id === workTime.id ? { ...wt, description: comment, managerDescription: comment } : wt
					),
				};
			}
			return s;
		});
		this.setDataWithScroll(newData);
		this.apiService
			.editWorkTime(workTime.id, comment, '/Description')
			.subscribe({ error: () => this.setDataWithScroll(oldData) });
	}

	public addLeaveTime(userId: string, leaveTime: LeaveTime): void {
		const oldData = this.data.value;
		const newData = oldData.map((s: UserStat) => {
			if (s.user.id === userId) {
				return {
					...s,
					leaveTimes: [leaveTime, ...s.leaveTimes],
				};
			}
			return s;
		});
		this.setDataWithScroll(newData);
	}

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

		this.setDataWithScroll(newData);
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
				.subscribe({ error: () => this.setDataWithScroll(oldData) });
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
		this.setDataWithScroll(newData);
		this.apiService
			.editLeaveTime(leaveTime.id, new PatchDocument(comment, LeaveTimePath.COMMENT))
			.subscribe({ error: () => this.setDataWithScroll(oldData) });
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
		this.setDataWithScroll(newData);
		this.apiService.deleteLeaveTime(leaveTimeId).subscribe({ error: () => this.setDataWithScroll(oldData) });
	}

	private getSortOrder(sort: SortDirection): boolean {
		return sort === 'asc';
	}
}
