import { Injectable } from '@angular/core';
import {
	CanLoad,
	Route,
	Router,
	UrlSegment,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
	constructor(private _authenticationService: AuthService, private _router: Router) {}

	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		if (this._authenticationService.isAuthenticated()) {
			return true;
		} else {
			this._router.navigate(['/auth/login']);
			return false;
		}
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this._authenticationService.isAuthenticated()) {
			if (route.routeConfig?.path === 'login') {
				this._router.navigate(['/admin/dashboard']);
				return false;
			}
			return true;
		} else {
			if (route.routeConfig?.path === 'login') {
				return true;
			} else {
				this._router.navigate(['/auth/login'], {
					queryParams: {
						return: state.url,
					},
				});
				return false;
			}
		}
	}
}
