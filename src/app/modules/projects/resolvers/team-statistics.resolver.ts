import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStatInfo } from '@api/time-service/models/user-stat-info';
import { DateTime } from 'luxon';
import { MAX_INT32 } from '@app/utils/utils';
import { TimeService } from '../team-statistics/time.service';

@Injectable({
	providedIn: 'root',
})
export class TeamStatisticsResolver implements Resolve<UserStatInfo[]> {
	constructor(private timeService: TimeService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserStatInfo[]> {
		const projectId = route.params['id'];
		const { month, year } = DateTime.now();
		return this.timeService.findStats({ projectId, month, year, skipCount: 0, takeCount: MAX_INT32 });
	}
}
