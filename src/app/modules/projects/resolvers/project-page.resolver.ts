import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectResponse } from '@api/project-service/models';
import { ProjectService } from '../project.service';

@Injectable({
	providedIn: 'root',
})
export class ProjectPageResolver implements Resolve<ProjectResponse> {
	constructor(private projectService: ProjectService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectResponse> {
		return this.projectService.getProject(route.params.id);
	}
}
