import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { PermissionService } from '@app/services/permission.service';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanLoad {
	constructor(private permissionService: PermissionService, private _router: Router) {}

	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		return this.permissionService.isAdmin$.pipe(
			first(),
			tap((isAdmin: boolean) => {
				if (!isAdmin) {
					this._router.navigate(['']);
				}
			})
		);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.permissionService.isAdmin$.pipe(
			first(),
			tap((isAdmin: boolean) => {
				if (!isAdmin) {
					this._router.navigate(['']);
				}
			})
		);
	}
}
