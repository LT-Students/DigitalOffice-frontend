import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '@app/services/user/user.service';

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
			includeimages: true,
			includecurrentavatar: true,
		};

		return this._userService.getUser(params).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
	}

	public setUser(user: User): void {
		this._user.next(user);
	}
}
