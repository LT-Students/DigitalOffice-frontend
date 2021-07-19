import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '@app/services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
	private _refreshingInProgress = false;
	private _accessTokenSubject = new BehaviorSubject(null);

	constructor(private localStorageService: LocalStorageService, private authService: AuthService, private _router: Router) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.localStorageService.get('access_token');

		if (req.body?.refreshToken) {
			return next.handle(req);
		}

		if (token && this._isTokenExpired(token)) {
			const refreshToken = this.localStorageService.get('refresh_token');
			if (!refreshToken || this._isTokenExpired(refreshToken)) {
				return this._logoutAndRedirect('Refresh token is expired');
			}
			return this._refreshToken(req, next);
		}

		const request = this._addAuthorizationHeader(req, token);

		return next.handle(request);
	}

	private _addAuthorizationHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
		let headers: HttpHeaders = req.headers.set('Access-Control-Allow-Origin', '*');

		if (token) {
			headers = headers.set('token', token);
		}

		return req.clone({ headers });
	}

	private _logoutAndRedirect(error): Observable<HttpEvent<any>> {
		this.authService.logout();

		return throwError(error);
	}

	private _refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!this._refreshingInProgress) {
			this._refreshingInProgress = true;
			this._accessTokenSubject.next(null);

			return this.authService.refreshToken().pipe(
				switchMap((result) => {
					this._refreshingInProgress = false;
					this._accessTokenSubject.next(result.accessToken);

					return next.handle(this._addAuthorizationHeader(req, result.accessToken));
				})
			);
		} else {
			return this._accessTokenSubject.pipe(
				filter((token) => token !== null),
				take(1),
				switchMap((token: string) => {
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
