import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserInfo } from '@data/api/user-service/models/user-info';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { UsersResponse } from '@data/api/user-service/models/users-response';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(
		private userApiService: UserApiService,
		private localStorageService: LocalStorageService,
	) {}

	getUser(userId: string): Observable<UserResponse> {
		return this.userApiService.getUser({ userId: userId }).pipe(
			tap((user: UserResponse) => this.localStorageService.set('user', user.user))
		);
	}

	getUsers(): Observable<UsersResponse> {
		return this.userApiService.findUsers( { skipCount: 0, takeCount: 50 } ).pipe(
			tap((res: UsersResponse) => console.log(res))
		);
	}

	isAdmin(): boolean {
		const user: UserInfo = this.localStorageService.get('user');
		return (user) ? user.isAdmin : false;
	}

	getCurrentUser(): UserInfo | null {
		const user: UserInfo = this.localStorageService.get('user');
		return user ? user : null;
	}

	createUser(params: CreateUserRequest): Observable<OperationResultResponse> {
		return this.userApiService.createUser({ body: params });
	}
}
