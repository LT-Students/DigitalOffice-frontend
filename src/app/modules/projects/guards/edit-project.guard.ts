import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CurrentUserService } from '@app/services/current-user.service';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { ProjectUserInfo } from '@api/project-service/models/project-user-info';
import { ProjectUserRoleType } from '@api/project-service/models/project-user-role-type';

@Injectable({
	providedIn: 'root',
})
export class EditProjectGuard implements CanActivate {
	constructor(private currentUser: CurrentUserService, private permission: PermissionService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.permission.checkPermission$(UserRights.AddEditRemoveProjects).pipe(
			first(),
			switchMap((hasPermission: boolean) => {
				if (hasPermission) {
					return of(true);
				} else {
					return this.currentUser.user$.pipe(
						first(),
						map((user: User) => {
							const projectUsers = (route.parent?.data['project'] as ProjectResponse).users;
							const currUser = projectUsers?.find((u: ProjectUserInfo) => u.userId === user.id);
							return !!currUser && currUser.role === ProjectUserRoleType.Manager;
						})
					);
				}
			})
		);
	}
}
