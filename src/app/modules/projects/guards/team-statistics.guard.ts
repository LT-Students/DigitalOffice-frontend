import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '@app/services/current-user.service';
import { first, map } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { ProjectUserInfo } from '@api/project-service/models/project-user-info';
import { ProjectUserRoleType } from '@api/project-service/models';

@Injectable({
	providedIn: 'root',
})
export class TeamStatisticsGuard implements CanActivate {
	constructor(private currentUser: CurrentUserService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.currentUser.user$.pipe(
			first(),
			map((user: User) => {
				if (user.isAdmin) {
					return true;
				} else {
					const projectUsers = (route.parent?.data['project'] as ProjectResponse).users;
					const currUser = projectUsers?.find((u: ProjectUserInfo) => u.userId === user.id);
					return !!currUser && currUser.role === ProjectUserRoleType.Manager;
				}
			})
		);
	}
}
