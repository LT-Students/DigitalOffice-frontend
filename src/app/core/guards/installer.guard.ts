import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '@app/services/local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class InstallerGuard implements CanActivate, CanLoad {
	constructor(private _companyApiService: CompanyApiService, private _localStorageService: LocalStorageService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const companyExists = this._localStorageService.get('company');

		if (companyExists) {
			return true;
		}

		return this._companyApiService.getCompany().pipe(
			map((result) => {
				if (result.body !== null) {
					this._localStorageService.set('company', result.body);

					return true;
				}
				this.router.navigate(['installer']);
				return false;
			})
		);
	}
	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return true;
	}
}
