import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { UserService } from '@app/services/user/user.service';
import { first, switchMap, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class CurrentUserService {
	private _user: ReplaySubject<User>;
	public readonly user$: Observable<User>;

	constructor(private _userService: UserService) {
		this._user = new ReplaySubject<User>(1);
		this.user$ = this._user.asObservable();
	}

	public getUserOnLogin(userId?: string): Observable<User> {
		const params: IGetUserRequest = {
			userId: userId,
			includedepartment: true,
			includerole: true,
			includecurrentavatar: true,
			includecompany: true,
			locale: 'ru',
		};

		return this._userService.getUser(params);
	}

	public setUser(user: User): void {
		this._user.next(user);
	}

	public refreshUser(): Observable<User> {
		return this.user$.pipe(
			first(),
			switchMap((u: User) => this.getUserOnLogin(u.id)),
			tap((u: User) => this.setUser(u))
		);
	}
}
