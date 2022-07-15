import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { CurrentUserService } from '@app/services/current-user.service';
import { UserRights } from '@app/types/user-rights.enum';
import { PermissionService } from '@app/services/permission.service';
import { UsersService } from './users.service';

@Injectable()
export class EmployeePageService {
	private selectedUser: ReplaySubject<User> = new ReplaySubject<User>(1);
	public readonly selectedUser$: Observable<User> = this.selectedUser.asObservable();

	constructor(
		private usersService: UsersService,
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

	public getEmployee(userId: string): Observable<User> {
		return this.usersService.getUser(userId).pipe(switchMap((user: User) => this.setUser(user)));
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
