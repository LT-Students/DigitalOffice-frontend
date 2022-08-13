import { Injectable } from '@angular/core';
import { StatApiService } from '@api/time-service/services/stat-api.service';
import { ImportApiService } from '@api/time-service/services/import-api.service';
import { map } from 'rxjs/operators';
import { UserStatInfo } from '@api/time-service/models/user-stat-info';
import { Observable } from 'rxjs';
import { WorkTimeApiService } from '@api/time-service/services/work-time-api.service';
import { UserStat } from '../models/user-stat';
import { TimelistEntityType } from '../models/timelist-entity';

@Injectable({
	providedIn: 'root',
})
export class TimeService {
	constructor(
		private statService: StatApiService,
		private importService: ImportApiService,
		private workTimeService: WorkTimeApiService
	) {}

	public findStats(
		entityType: TimelistEntityType,
		entityId: string,
		params: {
			ascendingsort?: boolean;
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

	public editWorkTime(workTimeId: string, hours: number): Observable<any> {
		return this.workTimeService.editWorkTime({
			workTimeId,
			body: [{ path: '/Hours', op: 'replace', value: hours }],
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
		return this.importService.getImport(params).pipe(map((res) => res.body as string));
	}
}
