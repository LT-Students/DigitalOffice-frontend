import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatSort, SortDirection } from '@angular/material/sort';
import { getUTCWithOffset, MAX_INT32 } from '@app/utils/utils';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { LeaveTimePath, PatchDocument } from '@app/types/edit-request';
import { User } from '@app/models/user/user.model';
import { TimeApiService } from '../services';
import { DynamicFilterComponent } from '../../dynamic-filter/dynamic-filter.component';
import { LeaveTime, LeaveTimeFactory, UserStat, WorkTime } from './user-stat';
import { TimelistEntityType } from './timelist-entity';
import { AdditionalTimelistFilters } from './additional-filters';

export class TimeListDataSource extends DataSource<UserStat> {
	private data = new BehaviorSubject<UserStat[]>([]);

	public set filter(filter: DynamicFilterComponent) {
		this._filter = filter;
	}
	private _filter!: DynamicFilterComponent;

	public set sort(sort: MatSort) {
		this._sort = sort;
	}
	private _sort!: MatSort;

	public set additionalFilters(additionalFilters: AdditionalTimelistFilters) {
		this._additionalFilters = additionalFilters;
	}
	private _additionalFilters?: AdditionalTimelistFilters;

	constructor(
		data: UserStat[],
		private apiService: TimeApiService,
		private entityType: TimelistEntityType,
		private currentUser: User
	) {
		super();
		this.data.next(data);
	}

	// sort and filter data on client until we start using server pagination
	connect(collectionViewer: CollectionViewer): Observable<UserStat[]> {
		return merge(this._filter.filterChange, this._sort.sortChange).pipe(
			startWith(null),
			switchMap(() => this.data.asObservable()),
			map((data) => this.filterByName(data)),
			map((data) => {
				if (this._additionalFilters) {
					return this._additionalFilters.filterFn(data, this._filter.value);
				}
				return data;
			}),
			map((data) => this.sortStats(data))
		);
	}

	disconnect(collectionViewer: CollectionViewer): void {}

	// TODO this is a temporary fix for scroll going to top after updating timelist. Need to somehow refactor the table
	//  to apply changes in place or maybe
	private setDataWithScroll(data: UserStat[]): void {
		const scrollContainer = document.querySelector('.content-container') as HTMLElement;
		const { scrollTop, scrollHeight } = scrollContainer;
		scrollContainer.style.height = scrollHeight + 'px';
		this.data.next(data);
		setTimeout(() => {
			scrollContainer.scroll({ top: scrollTop });
		});
		setTimeout(() => (scrollContainer.style.height = ''));
	}

	public loadStats(entityId: string, month: number, year: number): Observable<UserStat[]> {
		return this.apiService
			.findStats(this.entityType, entityId, {
				month,
				year,
				skipCount: 0,
				takeCount: MAX_INT32,
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

	private sortStats(stats: UserStat[]): UserStat[] {
		const sortOrder = this.getSortOrder(this._sort.direction);
		// sort alphabetically
		stats.sort((u1, u2) => {
			const u1Name = (u1.user.lastName + u1.user.firstName).toLowerCase();
			const u2Name = (u2.user.lastName + u2.user.firstName).toLowerCase();
			return u1Name.localeCompare(u2Name) * (sortOrder ? 1 : -1);
		});
		// sort pending users to the end of the list
		stats.sort(({ user: u1 }, { user: u2 }) => {
			if (u1.isPending) {
				return 1;
			}
			if (u2.isPending) {
				return -1;
			}
			return 0;
		});
		return stats;
	}

	private filterByName(stats: UserStat[]): UserStat[] {
		const name = this._filter.value['name'];
		return name
			? stats.filter((u) => {
					const fullName = `${u.user.lastName} ${u.user.firstName}`.toLowerCase();
					return fullName.includes(name.toLowerCase());
			  })
			: stats;
	}

	private getSortOrder(sort: SortDirection): boolean {
		return sort === 'asc';
	}
}
