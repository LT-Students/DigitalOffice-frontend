import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '@app/services/user/user.service';

@Injectable({
	providedIn: 'root',
})
export class CurrentUserService {
	private _currentUser: BehaviorSubject<User | null>;
	public readonly currentUser$: Observable<User | null>;

	constructor(private _userService: UserService) {
		this._currentUser = new BehaviorSubject<User | null>(null);
		this.currentUser$ = this._currentUser.asObservable();
	}

	public getUserOnLogin(userId?: string): Observable<User> {
		const params: IGetUserRequest = {
			userId: userId,
			includedepartment: true,
			includerole: true,
			includeimages: true,
		};

		return this._userService.getUser(params).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
	}

	public setUser(user: User): void {
		this._currentUser.next(user);
	}
}
