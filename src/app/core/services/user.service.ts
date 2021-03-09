import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '@data/api/user-service/models/user';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userApiService: UserApiService,
    private localStorageService: LocalStorageService
  ) {}

  getUser(userId: string): Observable<User> {
    return this.userApiService.getUserById({ userId }).pipe(
      tap((user: User) => {
        this.localStorageService.set('user', user);
      })
    );
  }

  isAdmin(): boolean {
    const user: User = this.localStorageService.get('user');
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
