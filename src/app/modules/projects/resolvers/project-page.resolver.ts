import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '@app/services/project/project.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ProjectResponse } from '@api/project-service/models/project-response';

@Injectable({
	providedIn: 'root',
})
export class ProjectPageResolver implements Resolve<OperationResultResponse<ProjectResponse>> {
	constructor(private _projectService: ProjectService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<ProjectResponse>> {
		return this._projectService.getProject({
			projectId: route.params.id,
			includeusers: true,
		});
	}
}
