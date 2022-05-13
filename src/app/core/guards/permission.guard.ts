import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
	constructor(private permissionService: PermissionService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		const permission: UserRights = route.data['permissions'];
		return this.permissionService.checkPermission(permission);
	}
}
