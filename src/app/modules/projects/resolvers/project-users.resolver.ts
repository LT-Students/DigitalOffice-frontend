import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserInfo } from '@api/project-service/models/user-info';
import { catchError } from 'rxjs/operators';
import { ProjectService } from '../project.service';

@Injectable({
	providedIn: 'root',
})
export class ProjectUsersResolver implements Resolve<UserInfo[]> {
	constructor(private projectService: ProjectService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInfo[]> {
		return this.projectService.getProjectUsers(route.params.id).pipe(catchError(() => of([])));
	}
}
