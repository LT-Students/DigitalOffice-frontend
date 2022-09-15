import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';
import { DepartmentListQueriesService } from '../department-list/department-list-queries.service';
import { DepartmentService } from '../services/department.service';

@Injectable({
	providedIn: 'root',
})
export class DepartmentListResolver implements Resolve<FindResponse<DepartmentInfo>> {
	constructor(
		private departmentService: DepartmentService,
		private listQueriesService: DepartmentListQueriesService,
		private permission: PermissionService
	) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<FindResponse<DepartmentInfo>> {
		const params = this.listQueriesService.convertQueryURLParamsToRequestParams(route.queryParams);
		return this.permission.checkPermission$(UserRights.AddEditRemoveDepartment).pipe(
			first(),
			switchMap((hasPermission: boolean) => {
				const isActiveParam = hasPermission ? null : { isActive: true };
				return this.departmentService.findDepartments({ ...params, ...isActiveParam });
			})
		);
	}
}
