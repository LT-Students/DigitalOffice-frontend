import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/services/local-storage.service';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@app/services/auth/auth.service';
import { CompanyService } from '@app/services/company/company.service';
import { CurrentUserService } from '@app/services/current-user.service';
import { CurrentCompanyService } from '@app/services/current-company.service';
import { EMPTY, iif } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AppInitService {
	constructor(
		private _currentUserService: CurrentUserService,
		private _currentCompanyService: CurrentCompanyService,
		private _companyService: CompanyService,
		private _localStorage: LocalStorageService,
		private _authService: AuthService
	) {}

	public getCompanyAndUser(): Promise<void> {
		const token: string | null = this._localStorage.get('access_token');

		const userId: string | undefined = token ? (JSON.parse(atob(token.split('.')[1])).UserId as string) : undefined;
		return new Promise((resolve) => {
			this._companyService
				.getCompany()
				.pipe(
					tap((company) => this._currentCompanyService.setCompany(company)),
					switchMap(() =>
						iif(
							() => token !== null,
							this._currentUserService
								.getUserOnLogin(userId)
								.pipe(tap((user) => this._currentUserService.setUser(user))),
							EMPTY
						)
					)
				)
				.subscribe()
				.add(resolve);
		});
	}
}
