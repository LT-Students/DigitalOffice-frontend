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
import { CurrentCompanyService } from '@app/services/current-company.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Company } from '@app/models/company';
import { RouteType } from '../../app-routing.module';

@Injectable({
	providedIn: 'root',
})
export class InstallerGuard implements CanActivate, CanLoad {
	constructor(private _currentCompanyService: CurrentCompanyService, private _router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this._currentCompanyService.company$.pipe(
			// map((company) => !!company),
			// tap((companyExists) => {
			// 	if (!companyExists) {
			// 		if (route.routeConfig?.path !== RouteType.INSTALLER) {
			// 			this._router.navigate([RouteType.INSTALLER]);
			// 		}
			// 	} else {
			// 		if (route.routeConfig?.path !== '') {
			// 			this._router.navigate(['']);
			// 		}
			// 	}
			// })
			map((company: Company) => !!company.id),
			switchMap((companyExists: boolean) => {
				if (!companyExists) {
					if (route.routeConfig?.path !== RouteType.INSTALLER) {
						return fromPromise(this._router.navigate([RouteType.INSTALLER]));
					} else return of(true);
				} else {
					if (route.routeConfig?.path !== '') {
						return fromPromise(this._router.navigate(['']));
					} else return of(true);
				}
			})
		);
	}

	canLoad(
		route: Route,
		segments: UrlSegment[]
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this._currentCompanyService.company$.pipe(
			map((company) => !!company),
			tap((companyExists) => {
				if (!companyExists) {
					this._router.navigate([RouteType.INSTALLER]);
				}
			})
		);
	}
}
