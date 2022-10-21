import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { MAX_INT32 } from '@app/utils/utils';
import { TimeApiService } from '../../manager-timelist/services';
import { UserStat, TimelistEntityType } from '../../manager-timelist/models';

@Injectable({
	providedIn: 'root',
})
export class TimelistResolver implements Resolve<UserStat[]> {
	constructor(private timeService: TimeApiService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserStat[]> {
		return this.timeService.findStats(TimelistEntityType.Department, route.params.id, {
			month: DateTime.now().month,
			year: DateTime.now().year,
			takeCount: MAX_INT32,
			skipCount: 0,
			ascendingsort: true,
		});
	}
}
