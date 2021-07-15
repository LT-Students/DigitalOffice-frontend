import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
	constructor(private localStorageService: LocalStorageService, private _router: Router) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.localStorageService.get('access_token');
		let headers: HttpHeaders = req.headers.set('Access-Control-Allow-Origin', '*');

		const jwtToken = JSON.parse(atob(token.split('.')[1]));
		const expires = jwtToken.exp * 1000;

		if (expires < Date.now()) {
			this._router.navigate([ '/auth/login' ]);

			return;
		}

		if (token) {
			headers = headers.set('token', token);
		}
		const cloned = req.clone({ headers });

		return next.handle(cloned);
	}
}
