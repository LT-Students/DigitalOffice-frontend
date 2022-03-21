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
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { PortalService } from '@app/services/portal.service';
import { AppRoutes } from '@app/models/app-routes';

@Injectable({
	providedIn: 'root',
})
export class InstallerGuard implements CanActivate, CanLoad {
	constructor(private portalService: PortalService, private _router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.portalService.isPortalExists$.pipe(
			switchMap((portalExists: boolean) => {
				if (!portalExists) {
					if (route.routeConfig?.path !== AppRoutes.Installer) {
						return fromPromise(this._router.navigate([AppRoutes.Installer]));
					} else {
						return of(true);
					}
				} else {
					if (route.routeConfig?.path !== '') {
						return fromPromise(this._router.navigate(['']));
					} else {
						return of(true);
					}
				}
			})
		);
	}

	canLoad(
		route: Route,
		segments: UrlSegment[]
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.portalService.isPortalExists$;
	}
}
