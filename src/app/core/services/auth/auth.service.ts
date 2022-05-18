import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthenticationRequest } from '@api/auth-service/models/authentication-request';
import { AuthenticationResponse } from '@api/auth-service/models/authentication-response';
import { AuthApiService } from '@api/auth-service/services/auth-api.service';
import { CredentialsApiService } from '@api/user-service/services/credentials-api.service';
import { CreateCredentialsRequest } from '@api/user-service/models/create-credentials-request';
import { OperationResultResponseCredentialsResponse } from '@api/user-service/models/operation-result-response-credentials-response';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { AppRoutes } from '@app/models/app-routes';
import { LocalStorageService } from '../local-storage.service';
import { AuthRoutes } from '../../../modules/auth/models/auth-routes';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private authApiService: AuthApiService,
		private _currentUserService: CurrentUserService,
		private credentialsApiService: CredentialsApiService,
		private localStorageService: LocalStorageService,
		private _router: Router
	) {}

	public login(authenticationRequest: AuthenticationRequest): Observable<User> {
		return this.authApiService.login({ body: authenticationRequest }).pipe(
			tap((authResponse) => this._setCredentialsToLocalStorage(authResponse)),
			switchMap((authResponse: AuthenticationResponse) =>
				this._currentUserService.getUserOnLogin(authResponse.userId)
			),
			tap((user) => this._currentUserService.setUser(user))
		);
	}

	public logout(): void {
		this._removeCredentialsFromLocalStorage();
		this._router.navigate([AppRoutes.Auth, AuthRoutes.SignIn]);
	}

	public isAuthenticated(): boolean {
		const token = this.localStorageService.get('access_token');

		return token != null;
	}

	public signUp$(
		createCredentialsRequest: CreateCredentialsRequest
	): Observable<OperationResultResponseCredentialsResponse> {
		return this.credentialsApiService.createCredentials({ body: createCredentialsRequest }).pipe(
			tap((response) => {
				if (response.body) {
					this._setCredentialsToLocalStorage(response.body);
				}
			})
		);
	}

	public refreshToken(): Observable<AuthenticationResponse> {
		const refreshToken: string = this.localStorageService.get('refresh_token');

		return this.authApiService.refresh({ body: { refreshToken: refreshToken } }).pipe(
			tap((authResponse: AuthenticationResponse) => {
				this._setCredentialsToLocalStorage(authResponse);
			})
		);
	}

	private _setCredentialsToLocalStorage(authenticationInfo: AuthenticationResponse): void {
		this.localStorageService.set('access_token', authenticationInfo.accessToken);
		this.localStorageService.set('refresh_token', authenticationInfo.refreshToken);
	}

	private _removeCredentialsFromLocalStorage(): void {
		this.localStorageService.remove('access_token');
		this.localStorageService.remove('refresh_token');
		this.localStorageService.remove('user');
	}
}
