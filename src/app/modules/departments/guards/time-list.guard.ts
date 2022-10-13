import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DepartmentPermissionService } from '../services/department-permission.service';

@Injectable({
	providedIn: 'root',
})
export class TimeListGuard implements CanActivate {
	constructor(private departmentPermissions: DepartmentPermissionService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const departmentId$ = of(route.params['id']);
		return this.departmentPermissions.canAccessTimeList$(departmentId$);
	}
}
