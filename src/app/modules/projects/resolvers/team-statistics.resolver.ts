import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { MAX_INT32 } from '@app/utils/utils';
import { UserStat } from '../../manager-timelist/models/user-stat';
import { TimeService } from '../../manager-timelist/services/time.service';
import { TimelistEntityType } from '../../manager-timelist/models/timelist-entity';

@Injectable({
	providedIn: 'root',
})
export class TeamStatisticsResolver implements Resolve<UserStat[]> {
	constructor(private timeService: TimeService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserStat[]> {
		const projectId = route.params['id'];
		const { month, year } = DateTime.now();
		return this.timeService.findStats(TimelistEntityType.Project, projectId, {
			month,
			year,
			skipCount: 0,
			takeCount: MAX_INT32,
		});
	}
}
