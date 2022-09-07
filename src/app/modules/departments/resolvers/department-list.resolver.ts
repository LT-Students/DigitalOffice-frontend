import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { DepartmentService } from '../services/department.service';
import { DepartmentListQueriesService } from '../department-list/department-list-queries.service';

@Injectable({
	providedIn: 'root',
})
export class DepartmentListResolver implements Resolve<FindResponse<DepartmentInfo>> {
	constructor(
		private departmentService: DepartmentService,
		private listQueriesService: DepartmentListQueriesService
	) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<FindResponse<DepartmentInfo>> {
		const params = this.listQueriesService.convertQueryURLParamsToRequestParams(route.queryParams);
		return this.departmentService.findDepartments(params);
	}
}
