import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { catchError, filter, first, switchMap } from 'rxjs/operators';
import { AuthService } from '@app/services/auth/auth.service';
import { AuthenticationResponse } from '@api/auth-service/models/authentication-response';
import { AuthTokenService } from '@app/services/auth-token.service';

@Injectable({
	providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
	private refreshingInProgress = false;
	private accessTokenSubject = new BehaviorSubject<string | null>(null);

	constructor(private authToken: AuthTokenService, private authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const accessToken = this.authToken.getAccessToken();

		return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
			catchError((error: any) => {
				if (error instanceof HttpErrorResponse) {
					if (error.status === 401) {
						const refreshToken = this.authToken.getRefreshToken();
						if (accessToken && refreshToken) {
							return this.refreshToken(req, next);
						}
						return this.logoutAndRedirect(error);
					}

					if (error.status === 403) {
						return this.logoutAndRedirect(error);
					}
				}

				return throwError(error);
			})
		);
	}

	private addAuthorizationHeader(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
		let headers: HttpHeaders = req.headers.set('Access-Control-Allow-Origin', '*');

		if (token) {
			headers = headers.set('token', token);
		}

		return req.clone({ headers });
	}

	private logoutAndRedirect(error: any): Observable<HttpEvent<any>> {
		this.authService.logout(true);

		return throwError(error);
	}

	private refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!this.refreshingInProgress) {
			this.refreshingInProgress = true;
			this.accessTokenSubject.next(null);

			return this.authService.refreshToken().pipe(
				switchMap((result: AuthenticationResponse) => {
					this.refreshingInProgress = false;
					this.accessTokenSubject.next(result.accessToken);

					return next.handle(this.addAuthorizationHeader(req, result.accessToken));
				})
			);
		} else {
			return this.accessTokenSubject.pipe(
				filter((token: string | null): token is string => !!token),
				first(),
				switchMap((token) => {
					return next.handle(this.addAuthorizationHeader(req, token));
				})
			);
		}
	}
}
