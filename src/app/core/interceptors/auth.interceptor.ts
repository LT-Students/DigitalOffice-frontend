import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '@app/services/auth/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
	private _refreshingInProgress: boolean;
	private _accessTokenSubject: BehaviorSubject<string | undefined>;
	private _excludedUrls: string[];

	constructor(
		private localStorageService: LocalStorageService,
		private authService: AuthService,
		private _router: Router
	) {
		this._refreshingInProgress = false;
		this._accessTokenSubject = new BehaviorSubject<string | undefined>(undefined);
		this._excludedUrls = ['/auth/refresh', '/graphicaluserinterface/get'];
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.localStorageService.get('access_token');
		req = this._addAuthorizationHeader(req, token);

		if (!!this._excludedUrls.find((url) => req.url.indexOf(url) !== -1)) {
			return next.handle(req);
		}

		if (token && this._isTokenExpired(token)) {
			const refreshToken = this.localStorageService.get('refresh_token');
			if (!refreshToken || this._isTokenExpired(refreshToken)) {
				return this._logoutAndRedirect('Refresh token is expired');
			}
			return this._refreshToken(req, next);
		}

		return next.handle(req);
	}

	private _addAuthorizationHeader(req: HttpRequest<any>, token: string | undefined): HttpRequest<any> {
		let headers: HttpHeaders = req.headers.set('Access-Control-Allow-Origin', '*');

		if (token) {
			headers = headers.set('token', token);
		}

		return req.clone({ headers });
	}

	private _logoutAndRedirect(error: string): Observable<HttpEvent<any>> {
		this.authService.logout(true);

		return throwError(error);
	}

	private _refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!this._refreshingInProgress) {
			this._refreshingInProgress = true;
			this._accessTokenSubject.next(undefined);

			return this.authService.refreshToken().pipe(
				switchMap((result) => {
					this._refreshingInProgress = false;
					this._accessTokenSubject.next(result.accessToken);

					return next.handle(this._addAuthorizationHeader(req, result.accessToken));
				})
			);
		} else {
			return this._accessTokenSubject.pipe(
				filter((token: string | undefined) => !!token),
				take(1),
				switchMap((token: string | undefined) => {
					return next.handle(this._addAuthorizationHeader(req, token));
				})
			);
		}
	}

	private _isTokenExpired(token: string): boolean {
		const parsedToken = JSON.parse(atob(token.split('.')[1]));
		const tokenExpiresAt = parsedToken.exp * 1000;

		return tokenExpiresAt < Date.now() - 1000 * 60 * 2;
	}
}
