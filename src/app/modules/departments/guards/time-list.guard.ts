import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '@app/services/current-user.service';
import { first, map } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { DepartmentUserInfo } from '@api/department-service/models/department-user-info';
import { DepartmentUserRole } from '@api/department-service/models/department-user-role';
import { Department } from '../department-page/department';

@Injectable({
	providedIn: 'root',
})
export class TimeListGuard implements CanActivate {
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
					const departmentUsers = (route.parent?.data['department'] as Department).users;
					const currUser = departmentUsers.find((u: DepartmentUserInfo) => u.userId === user.id);
					return !!currUser && currUser.role === DepartmentUserRole.Manager;
				}
			})
		);
	}
}
