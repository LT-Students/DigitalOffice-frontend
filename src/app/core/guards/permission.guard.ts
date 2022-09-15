import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
	constructor(private permissionService: PermissionService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		const permission: UserRights = route.data['permission'];
		return this.permissionService.checkPermission$(permission).pipe(first());
	}
}
