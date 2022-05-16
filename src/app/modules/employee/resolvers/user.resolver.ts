import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { FilterService } from '@app/services/filter/filter.service';
import { UserInfo } from '@api/filter-service/models/user-info';

@Injectable({
	providedIn: 'root',
})
export class UserResolver implements Resolve<OperationResultResponse<UserInfo[]>> {
	constructor(private filterService: FilterService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<UserInfo[]>> {
		return this.filterService.filterUsers({
			skipCount: 0,
			takeCount: 20,
		});
	}
}
