import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserRights } from '@app/types/user-rights.enum';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { PermissionService } from '@app/services/permission.service';
import { DepartmentUserInfo } from '@api/department-service/models/department-user-info';
import { DepartmentUserRole } from '@api/department-service/models/department-user-role';
import { Department } from '../department-page/department';

@Injectable({
	providedIn: 'root',
})
export class EditDepartmentGuard implements CanActivate {
	constructor(private currentUser: CurrentUserService, private permission: PermissionService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.permission.checkPermission$(UserRights.AddEditRemoveDepartment).pipe(
			first(),
			switchMap((hasPermission: boolean) => {
				if (hasPermission) {
					return of(true);
				} else {
					return this.currentUser.user$.pipe(
						first(),
						map((user: User) => {
							const departmentUsers = (route.parent?.data['department'] as Department).users;
							const currUser = departmentUsers.find((u: DepartmentUserInfo) => u.userId === user.id);
							return !!currUser && currUser.role === DepartmentUserRole.Manager;
						})
					);
				}
			})
		);
	}
}
