import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/services/local-storage.service';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@app/services/auth/auth.service';
import { CompanyService } from '@app/services/company/company.service';
import { CurrentUserService } from '@app/services/current-user.service';

@Injectable({
	providedIn: 'root',
})
export class AppInitService {
	constructor(
		private _currentUserService: CurrentUserService,
		private _companyService: CompanyService,
		private _localStorage: LocalStorageService,
		private _authService: AuthService
	) {}

	public getCompanyAndUser(): Promise<any> {
		const token: string | null = this._localStorage.get('access_token');

		const userId: string | undefined = token ? (JSON.parse(atob(token.split('.')[1])).UserId as string) : undefined;

		return new Promise((resolve) => {
			this._companyService
				.getCompany()
				.pipe(
					switchMap(() => this._currentUserService.getUserOnLogin(userId)),
					tap((user) => this._currentUserService.setUser(user))
				)
				.subscribe()
				.add(resolve);
		});
	}
}
