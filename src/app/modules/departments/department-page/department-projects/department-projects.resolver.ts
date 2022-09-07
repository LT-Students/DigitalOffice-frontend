import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { DepartmentProjectsApiService } from './services/department-projects-api.service';

@Injectable({
	providedIn: 'root',
})
export class DepartmentProjectsResolver implements Resolve<FindResponse<ProjectInfo>> {
	constructor(private apiService: DepartmentProjectsApiService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FindResponse<ProjectInfo>> {
		const departmentId = route.params['id'];
		return this.apiService.findProjects(departmentId);
	}
}
