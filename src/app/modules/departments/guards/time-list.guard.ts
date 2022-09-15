import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Department } from '../department-page/department';
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
		const department$ = of(route.parent?.data['department'] as Department);
		return this.departmentPermissions.canAccessTimeList$(department$);
	}
}
