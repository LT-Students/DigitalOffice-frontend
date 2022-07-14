import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { UserService } from '@app/services/user/user.service';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { CurrentUserService } from '@app/services/current-user.service';
import { UUID } from '@app/types/uuid.type';
import { UserRights } from '@app/types/user-rights.enum';
import { PermissionService } from '@app/services/permission.service';

@Injectable()
export class EmployeePageService {
	private selectedUser: ReplaySubject<User> = new ReplaySubject<User>(1);
	public readonly selectedUser$: Observable<User> = this.selectedUser.asObservable();

	constructor(
		private userService: UserService,
		private currentUserService: CurrentUserService,
		private permission: PermissionService
	) {}

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
			includeavatars: true,
			includeprojects: true,
			includecurrentavatar: true,
			includecompany: true,
			locale: 'ru',
		};

		return this.userService.getUser(params).pipe(switchMap((user: User) => this.setUser(user)));
	}

	public refreshSelectedUser(): Observable<User> {
		return this.selectedUser$.pipe(
			first(),
			switchMap((user: User) => this.getEmployee(user.id))
		);
	}

	public isOwner$(): Observable<boolean> {
		return combineLatest([this.selectedUser$, this.currentUserService.user$]).pipe(
			map(([u1, u2]: [User, User]) => u1.id === u2.id)
		);
	}

	public canManagePersonalInfo$(): Observable<boolean> {
		return combineLatest([this.permission.checkPermission$(UserRights.AddEditRemoveUsers), this.isOwner$()]).pipe(
			map(([hasPermission, isOwner]: [boolean, boolean]) => hasPermission || isOwner)
		);
	}
}
