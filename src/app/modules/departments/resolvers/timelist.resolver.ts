import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IFindStatRequest, TimeService } from '@app/services/time/time.service';
import { DateTime } from 'luxon';
import { FindResultResponseUserStatInfo } from '@api/time-service/models/find-result-response-user-stat-info';

@Injectable({
	providedIn: 'root',
})
export class TimelistResolver implements Resolve<FindResultResponseUserStatInfo> {
	constructor(private _timeService: TimeService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<FindResultResponseUserStatInfo> {
		const params: IFindStatRequest = {
			month: DateTime.now().month,
			year: DateTime.now().year,
			takeCount: 20,
			skipCount: 0,
			departmentsIds: [route.params.id],
		};

		return this._timeService.findStat(params);
	}
}
