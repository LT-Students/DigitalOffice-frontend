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
import { first, map } from 'rxjs/operators';
import { PortalService } from '@app/services/portal.service';
import { AppRoutes } from '@app/models/app-routes';

@Injectable({
	providedIn: 'root',
})
export class PortalGuard implements CanActivate, CanLoad {
	private installerUrl = this.router.createUrlTree([AppRoutes.Installer]);

	constructor(private portalService: PortalService, private router: Router) {}

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
			map((portalExists: boolean) => {
				return portalExists ? true : this.installerUrl;
			})
		);
	}
}
