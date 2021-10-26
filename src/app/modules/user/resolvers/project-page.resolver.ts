import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IGetProjectResponse, ProjectService } from '@app/services/project/project.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

@Injectable({
	providedIn: 'root',
})
export class ProjectPageResolver implements Resolve<OperationResultResponse<IGetProjectResponse>> {
	constructor(private _projectService: ProjectService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<IGetProjectResponse>> {
		return this._projectService.getProject({
			projectId: route.params.id,
			includeDescription: true,
			includeShortDescription: true,
			includeusers: true,
		});
	}
}
