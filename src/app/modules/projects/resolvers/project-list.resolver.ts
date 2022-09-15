import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { ProjectTableQueriesService } from '../projects-table/project-table-queries.service';
import { ProjectService } from '../project.service';

@Injectable({
	providedIn: 'root',
})
export class ProjectListResolver implements Resolve<FindResponse<ProjectInfo>> {
	constructor(private projectService: ProjectService, private tableQueries: ProjectTableQueriesService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FindResponse<ProjectInfo>> {
		const params = this.tableQueries.convertQueryURLParamsToRequestParams(route.queryParams);
		return this.projectService.findProjects(params);
	}
}
