import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanLoad,
	Route,
	Router,
	RouterStateSnapshot,
	UrlSegment,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';
import { AppRoutes } from '@app/models/app-routes';

@Injectable({
	providedIn: 'root',
})
export class IsLoggedGuard implements CanActivate, CanLoad {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canAccess();
	}

	canLoad(
		route: Route,
		segments: UrlSegment[]
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canAccess();
	}

	private canAccess(): boolean | UrlTree {
		return !this.authService.isAuthenticated() ? true : this.router.createUrlTree([AppRoutes.TimeTrack]);
	}
}
