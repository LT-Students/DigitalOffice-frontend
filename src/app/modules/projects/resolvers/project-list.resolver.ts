import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { CurrentUserService } from '@app/services/current-user.service';
import { first, switchMap } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { ProjectTableQueriesService } from '../projects-table/project-table-queries.service';
import { ProjectService } from '../project.service';

@Injectable({
	providedIn: 'root',
})
export class ProjectListResolver implements Resolve<OperationResultResponse<ProjectInfo[]>> {
	constructor(
		private currentUser: CurrentUserService,
		private projectService: ProjectService,
		private tableQueries: ProjectTableQueriesService
	) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<ProjectInfo[]>> {
		return this.currentUser.user$.pipe(
			first(),
			switchMap((user: User) => {
				const params = this.tableQueries.convertQueryURLParamsToEndpointParams(route.queryParams, user.id);
				return this.projectService.findProjects(params);
			})
		);
	}
}
