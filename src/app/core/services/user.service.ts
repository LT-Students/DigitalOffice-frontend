import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { UserInfo } from '@data/api/user-service/models/user-info';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { LocalStorageService } from './local-storage.service';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { UsersResponse } from '@data/api/user-service/models/users-response';
import { userResponse } from '../../modules/employee/mock';
import { ActivatedRoute } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public selectedUser: BehaviorSubject<UserResponse>;

	constructor(
		private userApiService: UserApiService,
		private route: ActivatedRoute,
		private localStorageService: LocalStorageService
	) {
		this.selectedUser = new BehaviorSubject<UserResponse>(null);
	}

	public getUser(userId: string): Observable<UserResponse> {
		return this.userApiService.getUser({ userId: userId }).pipe(
			tap((user: UserResponse) => {
				/*Не думаю, что нужно класть данные пользователя в локальное хранилище
				* поэтому предлагаю класть только основную информацию */
				this.localStorageService.set('user', user.user);
				this.selectedUser.next(user);
			})
		);
	}

	public getUsers(): Observable<UserInfo[]> {
		return this.userApiService
		/* TODO: Подумать, как получать конкретные данные о каждом юзере
		*   при получении данных о всех юзера
		* */
		.findUsers({ skipCount: 0, takeCount: 50 }).pipe(
			switchMap((usersResponse: UsersResponse) => of(usersResponse.users))
		);
	}

	public getMockUser(userId: string): Observable<UserResponse> {
		const userData: UserResponse = userResponse.find((user: UserResponse) => user.user.id === userId);
		return of(userData).pipe(tap((value: UserResponse) => console.log(value)));
	}

	public isAdmin(): boolean {
		const user: UserInfo = this.localStorageService.get('user');
		return (user) ? user.isAdmin : false;
	}

	public getCurrentUser(): UserInfo | null {
		const user: UserInfo = this.localStorageService.get('user');
		return user ? user : null;
	}

	public createUser(params: CreateUserRequest): Observable<OperationResultResponse> {
		return this.userApiService.createUser({ body: params });
	}
}
