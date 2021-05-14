import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { UserInfo } from '@data/api/user-service/models/user-info';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { LocalStorageService } from './local-storage.service';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { UsersResponse } from '@data/api/user-service/models/users-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userApiService: UserApiService,
    private localStorageService: LocalStorageService
  ) {}

  public getUser(userId: string): Observable<UserResponse> {
    return this.userApiService.getUser({ userId: userId }).pipe(
      tap((user: UserResponse) => {
        /*Не думаю, что нужно класть данные пользователя в локальное хранилище
        * поэтому предлагаю класть только основную информацию */
        this.localStorageService.set('user', user.user);
      })
    );
  }

  public isAdmin(): boolean {
    const user: UserInfo = this.localStorageService.get('user');
    return (user) ? user.isAdmin : false;
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

  public getCurrentUser(): UserInfo | null {
    const user: UserInfo = this.localStorageService.get('user');
    return user ? user : null;
  }

  createUser(params: CreateUserRequest): Observable<OperationResultResponse> {
    return this.userApiService.createUser({ body: params });
  }
}
