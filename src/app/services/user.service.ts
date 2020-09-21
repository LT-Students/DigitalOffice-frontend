import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserResponse, UserService as UserAPIService} from '../../../libs/api/src/lib/user-service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private userService: UserAPIService,
    private localStorageService: LocalStorageService) {}

  getUser(userId: string): Observable<UserResponse> {
    return this.userService.getUserByIdGet(userId).pipe(
      tap((user: UserResponse) => {
        this.localStorageService.set('user', user);
      })
    );
  }

  isAdmin(): boolean {
    const user: UserResponse = this.localStorageService.get('user');
    if ( user ) {
      return user.isAdmin;
    }
    return false;
  }

  getCurrentUser(): UserResponse | null {
    const user: UserResponse = this.localStorageService.get('user');
    return (user) ? user : null;
  }
}
