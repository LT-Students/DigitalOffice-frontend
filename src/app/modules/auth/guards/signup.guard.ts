import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { iif, Observable, of } from 'rxjs';
import { CredentialsService } from '@app/services/user/credentials.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class SignupGuard implements CanActivate {
	private redirectUrl = this.router.createUrlTree(['/auth/login']);

	constructor(private credentialsService: CredentialsService, private router: Router) {}

	public canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const userId = route.queryParamMap.get('userId');
		return userId
			? this.credentialsService.checkPendingCredentials(userId).pipe(
					map((response) => !!response.body),
					switchMap((pendingStatus) => iif(() => pendingStatus, of(true), of(this.redirectUrl))),
					catchError(() => of(this.redirectUrl))
			  )
			: this.redirectUrl;
	}
}
