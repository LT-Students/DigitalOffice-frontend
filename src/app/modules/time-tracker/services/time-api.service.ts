import { Injectable } from '@angular/core';
import { WorkTimeApiService } from '@api/time-service/services/work-time-api.service';
import { LeaveTimeApiService } from '@api/time-service/services/leave-time-api.service';
import { WorkTimeMonthLimitApiService } from '@api/time-service/services/work-time-month-limit-api.service';
import { Observable } from 'rxjs';
import {
	IFindLeaveTimesRequest,
	IFindWorkTimeMonthLimitRequest,
	IFindWorkTimesRequest,
} from '@app/services/time/time.service';
import { DateTime } from 'luxon';
import { CurrentUserService } from '@app/services/current-user.service';
import { first, map, switchMap } from 'rxjs/operators';
import {
	WorkTimeResponse,
	LeaveTimeResponse,
	CreateWorkTimeRequest,
	CreateLeaveTimeRequest,
	WorkTimeMonthLimitInfo,
} from '@api/time-service/models';
import { User } from '@app/models/user/user.model';
import { EditRequest, LeaveTimePath, WorkTimePath } from '@app/types/edit-request';
import { SubmitLeaveTimeValue } from '@shared/modules/shared-time-tracking-system/models';
import { LeaveTime, WorkTime } from '../models';

@Injectable({
	providedIn: 'root',
})
export class TimeApiService {
	constructor(
		private currentUser: CurrentUserService,
		private workTimeService: WorkTimeApiService,
		private leaveTimeApiService: LeaveTimeApiService,
		private workTimeMonthLimitApiService: WorkTimeMonthLimitApiService
	) {}

	public getWorkTimes(date: DateTime): Observable<WorkTime[]> {
		return this.getUserId$().pipe(
			switchMap((userId: string) => {
				const params: IFindWorkTimesRequest = {
					userid: userId,
					skipCount: 0,
					takeCount: 10,
					month: date.month,
					year: date.year,
				};

				return this.workTimeService.findWorkTimes(params);
			}),
			map((res) => (res.body as WorkTimeResponse[]).map((wt: WorkTimeResponse) => new WorkTime(wt)))
		);
	}

	public getLeaveTimes(date: DateTime): Observable<LeaveTime[]> {
		return this.getUserId$().pipe(
			switchMap((userId: string) => {
				const params: IFindLeaveTimesRequest = {
					userid: userId,
					skipCount: 0,
					takeCount: 10,
					starttime: date.startOf('month').toISO(),
					endtime: date.endOf('month').toISO(),
				};

				return this.leaveTimeApiService.findLeaveTimes(params);
			}),
			map((res) => (res.body as LeaveTimeResponse[]).map((lt: LeaveTimeResponse) => new LeaveTime(lt.leaveTime)))
		);
	}

	public getMonthLimit(date: DateTime): Observable<WorkTimeMonthLimitInfo | null> {
		const params: IFindWorkTimeMonthLimitRequest = {
			month: date.month,
			year: date.year,
			skipCount: 0,
			takeCount: 1,
		};
		return this.workTimeMonthLimitApiService.findWorkTimeMonthLimits(params).pipe(
			map((response) => {
				const limits = response.body;
				if (Array.isArray(limits) && limits.length) {
					return limits[0];
				}
				return null;
			})
		);
	}

	public editWorkTime(id: string, editRequest: EditRequest<WorkTimePath>): Observable<any> {
		return this.workTimeService.editWorkTime({ workTimeId: id, body: editRequest });
	}

	public createWorkTime(body: CreateWorkTimeRequest): Observable<any> {
		return this.workTimeService.createWorkTime({ body });
	}

	public createLeaveTime(value: SubmitLeaveTimeValue): Observable<any> {
		return this.getUserId$().pipe(
			switchMap((userId: string) => {
				const body: CreateLeaveTimeRequest = {
					userId,
					leaveType: value.leaveType,
					startTime: value.startTime.toSQL(),
					endTime: value.endTime.toSQL(),
					minutes: value.minutes,
					comment: value.comment || undefined,
				};
				return this.leaveTimeApiService.createLeaveTime({ body });
			})
		);
	}

	public editLeaveTime(id: string, editRequest: EditRequest<LeaveTimePath>): Observable<any> {
		return this.leaveTimeApiService.editLeaveTime({ leaveTimeId: id, body: editRequest });
	}

	public deleteLeaveTime(id: string): Observable<any> {
		const editRequest: EditRequest<LeaveTimePath> = [
			{
				path: LeaveTimePath.IS_ACTIVE,
				op: 'replace',
				value: false,
			},
		];
		return this.editLeaveTime(id, editRequest);
	}

	private getUserId$(): Observable<string> {
		return this.currentUser.user$.pipe(
			first(),
			map((user: User) => user.id)
		);
	}
}
