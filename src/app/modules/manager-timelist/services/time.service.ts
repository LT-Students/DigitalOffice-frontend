import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import {
	ImportApiService,
	LeaveTimeApiService,
	StatApiService,
	WorkTimeApiService,
	WorkTimeMonthLimitApiService,
} from '@api/time-service/services';
import { UserStatInfo } from '@api/time-service/models';
import { LeaveTimePath, PatchDocument } from '@app/types/edit-request';
import { UserStat } from '../models/user-stat';
import { TimelistEntityType } from '../models/timelist-entity';
import { SubmitLeaveTimeValue } from '../../time-tracker/services/attendance.service';
import { LeaveTime } from '../../time-tracker/models/leave-time';

@Injectable({
	providedIn: 'root',
})
export class TimeService {
	constructor(
		private statService: StatApiService,
		private importService: ImportApiService,
		private workTimeService: WorkTimeApiService,
		private leaveTimeService: LeaveTimeApiService,
		private monthLimitService: WorkTimeMonthLimitApiService
	) {}

	public findStats(
		entityType: TimelistEntityType,
		entityId: string,
		params: {
			ascendingsort: boolean;
			nameincludesubstring?: string;
			month: number;
			year: number;
			takeCount: number;
			skipCount: number;
		}
	): Observable<UserStat[]> {
		const entityParams =
			entityType === TimelistEntityType.Department ? { departmentsIds: [entityId] } : { projectId: entityId };
		params = { ...params, ...entityParams };
		return this.statService
			.findStat(params)
			.pipe(map((res) => (res.body || []).map((s: UserStatInfo) => new UserStat(s))));
	}

	public editWorkTime(workTimeId: string, newValue: any, path: '/Hours' | '/Description'): Observable<any> {
		return this.workTimeService.editWorkTime({
			workTimeId,
			body: [{ path, op: 'replace', value: newValue }],
		});
	}

	public importStats(
		entityType: TimelistEntityType,
		entityId: string,
		params: {
			month: number;
			year: number;
		}
	): Observable<string> {
		const entityParams =
			entityType === TimelistEntityType.Department ? { departmentId: entityId } : { projectId: entityId };
		params = { ...params, ...entityParams };
		const { month, year } = params;
		return this.importService.getImport(params).pipe(
			map((res) => res.body as string),
			tap((content: string) => {
				const filename = `Statistic_${year}_${month}`;
				const mediaType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
				const downloadLink = document.createElement('a');
				downloadLink.href = mediaType + content;
				downloadLink.download = filename;
				downloadLink.click();
				downloadLink.remove();
			})
		);
	}

	public findUserLeaveTimes(userId: string): Observable<any[]> {
		const startTime = DateTime.now().minus({ month: 1 }).startOf('month').toSQL();
		const endTime = DateTime.now().plus({ month: 1 }).endOf('month').toSQL();

		return this.leaveTimeService
			.findLeaveTimes({ userid: userId, starttime: startTime, endtime: endTime, skipCount: 0, takeCount: 30 })
			.pipe(map((res) => (res.body || []).map((lt) => new LeaveTime(lt.leaveTime))));
	}

	public findMonthLimit(month: number, year: number) {
		return this.monthLimitService
			.findWorkTimeMonthLimits({ takeCount: 1, skipCount: 0, month, year })
			.pipe(map((res) => (res.body && res.body[0] ? res.body[0] : null)));
	}

	public addLeaveTime(userId: string, ltValue: SubmitLeaveTimeValue): Observable<unknown> {
		return this.leaveTimeService.createLeaveTime({ body: { userId, ...ltValue } as any });
	}

	public editLeaveTime(
		leaveTimeId: string,
		editRequest: PatchDocument<LeaveTimePath>[] | PatchDocument<LeaveTimePath>
	): Observable<unknown> {
		return this.leaveTimeService.editLeaveTime({
			leaveTimeId,
			body: Array.isArray(editRequest) ? editRequest : [editRequest],
		});
	}

	public deleteLeaveTime(leaveTimeId: string): Observable<unknown> {
		return this.editLeaveTime(leaveTimeId, [new PatchDocument<LeaveTimePath>(false, LeaveTimePath.IS_ACTIVE)]);
	}
}
