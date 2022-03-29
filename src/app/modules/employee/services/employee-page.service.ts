import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { UserService } from '@app/services/user/user.service';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { CurrentUserService } from '@app/services/current-user.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UUID } from '@app/types/uuid.type';

@Injectable({
	providedIn: 'root',
})
export class EmployeePageService implements Resolve<User> {
	private _selectedUser: ReplaySubject<User>;
	public readonly selectedUser$: Observable<User>;

	constructor(
		private _userService: UserService,
		private _currentUserService: CurrentUserService,
		private _snackBar: MatSnackBar
	) {
		this._selectedUser = new ReplaySubject<User>(1);
		this.selectedUser$ = this._selectedUser.asObservable();
	}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
		return this.getEmployee(route.params.id);
	}

	public getEmployee(userId: UUID): Observable<User> {
		const params: IGetUserRequest = {
			userId: userId,
			includedepartment: true,
			includeposition: true,
			includeoffice: true,
			includecommunications: true,
			includerole: true,
			includeuserimages: true,
			includeprojects: true,
			includecurrentavatar: true,
		};

		return this._userService.getUser(params).pipe(
			withLatestFrom(this._currentUserService.user$),
			tap(([selectedUser, currentUser]) => {
				this._selectedUser.next(selectedUser);
				if (currentUser.id === userId) {
					this._currentUserService.setUser(selectedUser);
				}
			}),
			map(([user, _]) => user)
		);
	}
}