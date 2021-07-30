import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
	constructor(private authenticationService: AuthService, private router: Router) {
	}

	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		if (this.authenticationService.isAuthenticated()) {
			return true;
		} else {
			this.router.navigate(['/auth/login']);
			return false;
		}
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authenticationService.isAuthenticated()) {
			if (route.routeConfig.path === 'login') {
				this.router.navigate(['/admin/dashboard'])
				return false;
			}
			return true;
		} else {
			if (route.routeConfig.path === 'login') {
				return true;
			  } else {
				this.router.navigate(['/auth/login'], {
					queryParams: {
						return: state.url,
					},
				});
				return false;
			  }
		}
	}
}
