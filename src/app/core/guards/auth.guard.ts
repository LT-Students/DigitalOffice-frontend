import { Injectable } from '@angular/core';
import {
	CanLoad,
	Route,
	Router,
	UrlSegment,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivate,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AppRoutes } from '@app/models/app-routes';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canLoad(
		route: Route,
		segments: UrlSegment[]
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const url = this.router.getCurrentNavigation()?.extractedUrl.toString();
		return this.canAccess(url);
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canAccess(state.url);
	}

	private canAccess(url?: string): boolean | UrlTree {
		url = url && url !== '/' ? url : undefined;
		return this.authService.isAuthenticated()
			? true
			: this.router.createUrlTree([AppRoutes.Auth], {
					queryParams: {
						return: url,
					},
			  });
	}
}
