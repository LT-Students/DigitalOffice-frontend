import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanLoad,
	Route,
	UrlSegment,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { PortalInfoService } from '@app/services/portal-info.service';
import { AppRoutes } from '@app/models/app-routes';

@Injectable({
	providedIn: 'root',
})
export class InstallerGuard implements CanActivate, CanLoad {
	private redirectUrl = this.router.createUrlTree([AppRoutes.Auth]);

	constructor(private portalService: PortalInfoService, private router: Router) {}

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

	private canAccess(): Observable<boolean | UrlTree> {
		return this.portalService.isPortalExists$.pipe(
			first(),
			map((portalExists: boolean) => (portalExists ? this.redirectUrl : true))
		);
	}
}
