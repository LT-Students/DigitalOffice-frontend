import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { defaultProjectsTakeCount } from '../helpers';
import { ProjectService } from '../project.service';

@Injectable({
	providedIn: 'root',
})
export class ProjectListResolver implements Resolve<OperationResultResponse<ProjectInfo[]>> {
	constructor(private projectService: ProjectService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<ProjectInfo[]>> {
		return this.projectService.findProjects({ skipCount: 0, takeCount: defaultProjectsTakeCount });
	}
}
