import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProjectApiService } from '@api/project-service/services/project-api.service';
import { MAX_INT32 } from '@app/utils/utils';
import { catchError, map } from 'rxjs/operators';
import { ProjectInfo } from '@api/project-service/models/project-info';

@Injectable({
	providedIn: 'root',
})
export class PersonalProjectsResolver implements Resolve<ProjectInfo[]> {
	constructor(private projectService: ProjectApiService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectInfo[]> {
		const userId = route.params['id'];
		return this.projectService.findProjects({ skipCount: 0, takeCount: MAX_INT32, userid: userId }).pipe(
			map((res) => res.body as ProjectInfo[]),
			catchError(() => of([]))
		);
	}
}
