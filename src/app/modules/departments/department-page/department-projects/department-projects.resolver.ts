import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { DepartmentPageStateService } from '../../department-id-route-container/department-page-state.service';

@Injectable({
	providedIn: 'root',
})
export class DepartmentProjectsResolver implements Resolve<FindResponse<ProjectInfo>> {
	constructor(private depState: DepartmentPageStateService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FindResponse<ProjectInfo>> {
		const departmentId = route.params['id'];
		return this.depState.resolveProjects(departmentId);
	}
}
