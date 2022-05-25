import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '@app/services/current-user.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanLoad {
	constructor(private _currentUserService: CurrentUserService, private _router: Router) {}

	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		return this._currentUserService.user$.pipe(
			map((user) => user.isAdmin),
			tap((isAdmin) => {
				if (!isAdmin) {
					this._router.navigate(['']);
				}
			})
		);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this._currentUserService.user$.pipe(
			map((user) => user.isAdmin),
			tap((isAdmin) => {
				if (!isAdmin) {
					this._router.navigate(['']);
				}
			})
		);
	}
}
