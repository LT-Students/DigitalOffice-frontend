import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  UserService as UserAPIService, User,
} from '@digital-office/api/user-service';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userService: UserAPIService,
    private localStorageService: LocalStorageService
  ) {}

  getUser(userId: string): Observable<User> {
    return this.userService.getUserByIdGet(userId).pipe(
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
