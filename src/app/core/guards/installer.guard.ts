import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';

@Injectable({
	providedIn: 'root',
})
export class InstallerGuard implements CanActivate, CanLoad {
	constructor(private companyApiService: CompanyApiService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		this.companyApiService.getCompany().subscribe(res => console.log(res));
		if (this.companyApiService.getCompany()) {
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
