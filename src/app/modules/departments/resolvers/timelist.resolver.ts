import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { MAX_INT32 } from '@app/utils/utils';
import { TimeService } from '../../manager-timelist/time.service';
import { UserStat } from '../../manager-timelist/models/user-stat';

@Injectable({
	providedIn: 'root',
})
export class TimelistResolver implements Resolve<UserStat[]> {
	constructor(private timeService: TimeService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserStat[]> {
		return this.timeService.findStats({
			month: DateTime.now().month,
			year: DateTime.now().year,
			takeCount: MAX_INT32,
			skipCount: 0,
			departmentsIds: [route.params.id],
		});
	}
}
