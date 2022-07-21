import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { ProjectService } from '../project.service';
import { ProjectTableQueriesService } from '../projects-table/project-table-queries.service';

@Injectable({
	providedIn: 'root',
})
export class ProjectListResolver implements Resolve<OperationResultResponse<ProjectInfo[]>> {
	constructor(private projectService: ProjectService, private tableQueries: ProjectTableQueriesService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<ProjectInfo[]>> {
		const params = this.tableQueries.parseQueryParams(route.queryParams);
		return this.projectService.findProjects({ ...params, includedepartment: true });
	}
}
