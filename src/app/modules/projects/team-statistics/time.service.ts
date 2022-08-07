import { Injectable } from '@angular/core';
import { StatApiService } from '@api/time-service/services/stat-api.service';
import { ImportApiService } from '@api/time-service/services/import-api.service';
import { map } from 'rxjs/operators';
import { UserStatInfo } from '@api/time-service/models/user-stat-info';
import { Observable } from 'rxjs';
import { WorkTimeApiService } from '@api/time-service/services/work-time-api.service';
import { UserStat } from './user-stat';

@Injectable({
	providedIn: 'root',
})
export class TimeService {
	constructor(
		private statService: StatApiService,
		private importService: ImportApiService,
		private workTimeService: WorkTimeApiService
	) {}

	public findStats(params: {
		departmentsIds?: string[];
		projectId?: string;
		ascendingsort?: boolean;
		nameincludesubstring?: string;
		month?: number;
		year: number;
		takeCount: number;
		skipCount: number;
	}): Observable<UserStat[]> {
		return this.statService
			.findStat(params)
			.pipe(map((res) => (res.body as UserStatInfo[]).map((s: UserStatInfo) => new UserStat(s))));
	}

	public editWorkTime(workTimeId: string, hours: number): Observable<any> {
		return this.workTimeService.editWorkTime({
			workTimeId,
			body: [{ path: '/Hours', op: 'replace', value: hours }],
		});
	}

	public importStats(params: {
		departmentId?: string;
		projectId?: string;
		month: number;
		year: number;
	}): Observable<string> {
		return this.importService.getImport(params).pipe(map((res) => res.body as string));
	}
}
