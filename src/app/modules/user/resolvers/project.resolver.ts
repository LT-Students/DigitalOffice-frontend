import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '@app/services/project/project.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ProjectInfo } from '@data/api/project-service/models/project-info';

@Injectable({
	providedIn: 'root',
})
export class ProjectResolver implements Resolve<OperationResultResponse<ProjectInfo[]>> {
	constructor(private _projectService: ProjectService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<ProjectInfo[]>> {
		return this._projectService.findProjects(0, 10);
	}
}
