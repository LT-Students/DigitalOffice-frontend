import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { UserService } from '@app/services/user/user.service';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { CurrentUserService } from '@app/services/current-user.service';
import { UUID } from '@app/types/uuid.type';

@Injectable()
export class EmployeePageService {
	private selectedUser: ReplaySubject<User> = new ReplaySubject<User>(1);
	public readonly selectedUser$: Observable<User> = this.selectedUser.asObservable();

	constructor(private userService: UserService, private currentUserService: CurrentUserService) {}

	public setUser(user: User): Observable<User> {
		this.selectedUser.next(user);
		return this.currentUserService.user$.pipe(
			first(),
			tap((currentUser: User) => {
				if (currentUser.id === user.id) {
					this.currentUserService.setUser(user);
				}
			}),
			map(() => user)
		);
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

		return this.userService.getUser(params).pipe(switchMap((user: User) => this.setUser(user)));
	}

	public refreshSelectedUser(): Observable<User> {
		return this.selectedUser$.pipe(
			first(),
			switchMap((user: User) => this.getEmployee(user.id))
		);
	}
}
