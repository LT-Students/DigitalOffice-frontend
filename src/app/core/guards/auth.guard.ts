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

import { AppRoutes } from '@app/models/app-routes';
import { AuthService } from '../services/auth/auth.service';
import { AuthRoutes } from '../../modules/auth/models/auth-routes';
import { AdminRoutes } from '../../modules/admin/models/admin-routes';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
	constructor(private _authenticationService: AuthService, private _router: Router) {}

	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		if (this._authenticationService.isAuthenticated()) {
			return true;
		} else {
			this._router.navigate([AppRoutes.Auth, AuthRoutes.SignIn]);
			return false;
		}
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this._authenticationService.isAuthenticated()) {
			if (route.routeConfig?.path === 'login') {
				this._router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
				return false;
			}
			return true;
		} else {
			if (route.routeConfig?.path === 'login') {
				return true;
			} else {
				this._router.navigate([AppRoutes.Auth, AuthRoutes.SignIn], {
					queryParams: {
						return: state.url,
					},
				});
				return false;
			}
		}
	}
}
