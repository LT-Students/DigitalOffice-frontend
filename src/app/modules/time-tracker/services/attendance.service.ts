import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { CreateWorkTimeRequest, WorkTimeMonthLimitInfo } from '@api/time-service/models';
import { isGUIDEmpty } from '@app/utils/utils';
import { EditRequest, LeaveTimePath, PatchDocument, WorkTimePath } from '@app/types/edit-request';
import { CurrentUserService } from '@app/services/current-user.service';
import { User } from '@app/models/user/user.model';
import { CanManageTimeInSelectedDate, SubmitLeaveTimeValue } from '@shared/modules/shared-time-tracking-system/models';
import { WorkTime, LeaveTime } from '../models';
import { TimeApiService } from './time-api.service';
import { Activities, AttendanceStoreService } from './attendance-store.service';
import { MonthNormService } from './month-norm.service';

export interface SubmitWorkTimeValue {
	workTimeId: string;
	time: number;
	comment: string;
	initialValue?: WorkTime;
}

@Injectable()
export class AttendanceService {
	constructor(
		private timeApi: TimeApiService,
		private currentUser: CurrentUserService,
		private store: AttendanceStoreService,
		private canManageTime: CanManageTimeInSelectedDate,
		private monthNormService: MonthNormService
	) {}

	public submitWorkTime(value: SubmitWorkTimeValue, date: DateTime): Observable<any> {
		const { workTimeId, time, comment } = value;
		let action: Observable<any>;
		if (isGUIDEmpty(workTimeId)) {
			const { month, year, offset } = date;
			const createRequest: CreateWorkTimeRequest = {
				month,
				year,
				offset: offset / 60,
				hours: time,
				description: comment,
			};
			action = this.timeApi.createWorkTime(createRequest);
		} else {
			const editRequest = this.getWorkTimeEditRequest(value);
			action = editRequest.length ? this.timeApi.editWorkTime(workTimeId, editRequest) : of(null);
		}
		return action.pipe(tap(() => this.canManageTime.setNewDate(date)));
	}

	private getWorkTimeEditRequest(value: SubmitWorkTimeValue): EditRequest<WorkTimePath> {
		const initialValue = value.initialValue as WorkTime;
		const editRequest: EditRequest<WorkTimePath> = [];
		if (value.time !== initialValue.userHours) {
			editRequest.push(new PatchDocument(value.time, WorkTimePath.Hours));
		}
		if (value.comment !== initialValue.description) {
			editRequest.push(new PatchDocument(value.comment, WorkTimePath.Description));
		}
		return editRequest;
	}

	public getMonthActivities(): Observable<Activities> {
		return forkJoin({ workTimes: this.getWorkTimes(), leaveTimes: this.getLeaveTimes() });
	}

	public getWorkTimes(): Observable<WorkTime[]> {
		return this.canManageTime.getSelectedDate$().pipe(
			switchMap((date: DateTime) => this.timeApi.getWorkTimes(date)),
			tap(this.store.setWorkTimes.bind(this.store))
		);
	}

	public getLeaveTimes(): Observable<LeaveTime[]> {
		return this.canManageTime.getSelectedDate$().pipe(
			switchMap((date: DateTime) => this.timeApi.getLeaveTimes(date)),
			tap(this.store.setLeaveTimes.bind(this.store))
		);
	}

	/**
	 *
	 * @return leaveTimeId
	 */
	public submitLeaveTime(
		leaveValue: SubmitLeaveTimeValue,
		initialValue?: Required<SubmitLeaveTimeValue>
	): Observable<string> {
		let action: Observable<string>;
		if (initialValue) {
			const { leaveTimeId, ...compareValue } = initialValue;
			const editRequest = this.getLeaveTimeEditRequest(leaveValue, compareValue);
			action = this.timeApi.editLeaveTime(leaveTimeId, editRequest).pipe(map(() => leaveTimeId));
		} else {
			action = this.timeApi.createLeaveTime(leaveValue).pipe(map((res) => res.body));
		}
		return action.pipe(switchMap((id: string) => this.getLeaveTimes().pipe(map(() => id))));
	}

	private getLeaveTimeEditRequest(
		newValue: SubmitLeaveTimeValue,
		compareValue: SubmitLeaveTimeValue
	): EditRequest<LeaveTimePath> {
		return Object.keys(newValue)
			.filter((key: string) => {
				const k = key as keyof SubmitLeaveTimeValue;
				const v1 = newValue[k];
				if (v1 instanceof DateTime) {
					const v2 = compareValue[k] as DateTime;
					return v1.day !== v2.day || v1.month === v2.month || v1.year === v2.year;
				}
				return newValue[k] !== compareValue[k];
			})
			.map(
				(key: string) =>
					new PatchDocument(
						newValue[key as keyof SubmitLeaveTimeValue],
						`/${key[0].toUpperCase() + key.slice(1)}` as LeaveTimePath
					)
			);
	}

	public deleteLeaveTime(id: string): Observable<any> {
		return this.store.leaveTimes$.pipe(
			first(),
			switchMap((lts: LeaveTime[]) => {
				const oldLts = lts;
				const newLts = lts.filter((lt: LeaveTime) => lt.id !== id);
				this.store.setLeaveTimes(newLts);
				return this.timeApi.deleteLeaveTime(id).pipe(
					catchError((err) => {
						this.store.setLeaveTimes(oldLts);
						return throwError(err);
					})
				);
			})
		);
	}

	public getMonthNorm(): Observable<any> {
		return forkJoin([this.currentUser.user$, this.canManageTime.selectedDate$]).pipe(
			first(),
			switchMap(([user, date]: [User, DateTime]) =>
				this.timeApi
					.getMonthLimit(date)
					.pipe(
						tap((limit: WorkTimeMonthLimitInfo) =>
							this.monthNormService.setMonthNorm(limit.normHours, user.company?.rate || 1)
						)
					)
			)
		);
	}
}
