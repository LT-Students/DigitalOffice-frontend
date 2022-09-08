import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { DepartmentUsersApiService } from './services/department-users-api.service';
import { DepartmentUser } from './models/department-user';

@Injectable({
	providedIn: 'root',
})
export class DepartmentUsersResolver implements Resolve<FindResponse<DepartmentUser>> {
	constructor(private apiService: DepartmentUsersApiService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FindResponse<DepartmentUser>> {
		const departmentId = route.params['id'];
		return this.apiService.findUsers(departmentId, {
			isAscendingSort: true,
			departmentUserRoleAscendingSort: false,
		});
	}
}
