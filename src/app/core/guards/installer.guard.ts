import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';

@Injectable({
	providedIn: 'root',
})
export class InstallerGuard implements CanActivate, CanLoad {
	constructor(private positionService: PositionApiService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (!this.positionService.getPositionsList()) {
			return true;
		} else {
			this.router.navigate(['installer']);
			return false;
		}
	}
	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return true;
	}
}
