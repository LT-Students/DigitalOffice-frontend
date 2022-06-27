import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthTokenService {
	constructor() {}

	public getAccessToken(): string | null {
		return localStorage.getItem('access_token');
	}

	public getRefreshToken(): string | null {
		return localStorage.getItem('refresh_token');
	}

	public setTokens(accessToken: string, refreshToken: string): void {
		localStorage.setItem('access_token', accessToken);
		localStorage.setItem('refresh_token', refreshToken);
	}

	public removeTokens(): void {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	}

	public getUserId(): string | null {
		const token = this.getAccessToken();
		try {
			return token && (JSON.parse(atob(token.split('.')[1])).UserId as string);
		} catch (e) {
			return null;
		}
	}
}
