import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { UserService } from '@app/services/user/user.service';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class EmployeePageService {
	private _selectedUser: BehaviorSubject<User | null>;
	public readonly selectedUser$: Observable<User | null>;

	constructor(private _userService: UserService) {
		this._selectedUser = new BehaviorSubject<User | null>(null);
		this.selectedUser$ = this._selectedUser.asObservable();
	}

	public getEmployee(userId: string): Observable<User> {
		const params: IGetUserRequest = {
			userId: userId,
			includedepartment: true,
			includeposition: true,
			includeoffice: true,
			includecommunications: true,
			includerole: true,
			includeimages: true,
			includeprojects: true,
		};

		return this._userService.getUser(params).pipe(tap((user) => this._selectedUser.next(user)));
	}

	public editEmployee(editRequest: { path: string; value: any }[]): Observable<User> {
		const userId = this._selectedUser.value?.id as string;
		return this._userService.editUser(userId, editRequest).pipe(switchMap(() => this.getEmployee(userId)));
	}
}
