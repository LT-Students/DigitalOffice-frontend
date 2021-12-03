import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { iif, Observable, of } from 'rxjs';
import { CredentialsService } from '@app/services/user/credentials.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class SignupGuard implements CanActivate {
	constructor(private _credentialsService: CredentialsService, private _router: Router) {}

	public canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const redirectUrl = this._router.createUrlTree(['/auth/login']);
		return this._credentialsService.checkPendingCredentials(route.queryParamMap.get('userId') ?? '').pipe(
			map((response) => !!response.body),
			switchMap((pendingStatus) => iif(() => pendingStatus, of(true), of(redirectUrl))),
			catchError(() => of(redirectUrl))
		);
	}
}
