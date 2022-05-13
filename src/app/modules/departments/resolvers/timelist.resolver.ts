import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IFindStatRequest, TimeService } from '@app/services/time/time.service';
import { FindResultResponseStatInfo } from '@api/time-service/models/find-result-response-stat-info';
import { DateTime } from 'luxon';

@Injectable({
	providedIn: 'root',
})
export class TimelistResolver implements Resolve<FindResultResponseStatInfo> {
	constructor(private _timeService: TimeService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FindResultResponseStatInfo> {
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
