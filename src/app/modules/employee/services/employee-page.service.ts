import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { UserService } from '@app/services/user/user.service';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { first, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CurrentUserService } from '@app/services/current-user.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UUID } from '@app/types/uuid.type';

@Injectable({
	providedIn: 'root',
})
export class EmployeePageService implements Resolve<User> {
	private selectedUser: ReplaySubject<User> = new ReplaySubject<User>(1);
	public readonly selectedUser$: Observable<User> = this.selectedUser.asObservable();

	constructor(private userService: UserService, private currentUserService: CurrentUserService) {}

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

		return this.userService.getUser(params).pipe(
			withLatestFrom(this.currentUserService.user$),
			tap(([selectedUser, currentUser]) => {
				this.selectedUser.next(selectedUser);
				if (currentUser.id === userId) {
					this.currentUserService.setUser(selectedUser);
				}
			}),
			map(([user, _]) => user)
		);
	}

	public refreshSelectedUser(): Observable<User> {
		return this.selectedUser$.pipe(
			first(),
			switchMap((user: User) => this.getEmployee(user.id))
		);
	}
}
