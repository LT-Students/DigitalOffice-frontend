import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '@data/api/project-service/models/user';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { IUser } from '@data/models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userApiService: UserApiService,
    private localStorageService: LocalStorageService
  ) {}

  getUser(userId: string): Observable<UserResponse> {
    return this.userApiService.getUser({ userId }).pipe(
      tap((user: UserResponse) => {
        this.localStorageService.set('user', user);
      })
    );
  }

  isAdmin(): boolean {
    const user: IUser = this.localStorageService.get('user');
    if (user) {
      return user.isAdmin;
    }
    return false;
  }

  getCurrentUser(): User | null {
    const user: User = this.localStorageService.get('user');
    return user ? user : null;
  }
}
