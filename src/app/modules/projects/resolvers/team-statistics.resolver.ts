import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { MAX_INT32 } from '@app/utils/utils';
import { TimeService } from '../team-statistics/time.service';
import { UserStat } from '../team-statistics/user-stat';

@Injectable({
	providedIn: 'root',
})
export class TeamStatisticsResolver implements Resolve<UserStat[]> {
	constructor(private timeService: TimeService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserStat[]> {
		const projectId = route.params['id'];
		const { month, year } = DateTime.now();
		return this.timeService.findStats({ projectId, month, year, skipCount: 0, takeCount: MAX_INT32 });
	}
}
