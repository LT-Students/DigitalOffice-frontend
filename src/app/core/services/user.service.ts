import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserInfo } from '@data/api/user-service/models/user-info';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { LocalStorageService } from './local-storage.service';
import { UserResponse } from '@data/api/user-service/models/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userApiService: UserApiService,
    private localStorageService: LocalStorageService
  ) {}

  getUser(userId: string): Observable<UserResponse> {
    return this.userApiService.getUser({ userId: userId }).pipe(
      tap((user: UserResponse) => {
        this.localStorageService.set('user', user);
      })
    );
  }

  isAdmin(): boolean {
    const user: UserInfo = this.localStorageService.get('user');
    if (user) {
      return user.isAdmin;
    }
    return false;
  }

  getCurrentUser(): UserInfo | null {
    const user: UserInfo = this.localStorageService.get('user');
    return user ? user : null;
  }
}
