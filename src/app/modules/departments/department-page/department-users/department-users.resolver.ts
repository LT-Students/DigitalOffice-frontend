import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { DepartmentPageStateService } from '../../department-id-route-container/department-page-state.service';
import { DepartmentUser } from './models/department-user';

@Injectable({
	providedIn: 'root',
})
export class DepartmentUsersResolver implements Resolve<FindResponse<DepartmentUser>> {
	constructor(private depState: DepartmentPageStateService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FindResponse<DepartmentUser>> {
		const departmentId = route.params['id'];
		return this.depState.resolveUsers(departmentId);
	}
}
