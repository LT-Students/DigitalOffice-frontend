import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { UserResponse } from '../../../libs/api/src/lib/user-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) {
  }

  getUser(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(environment.userServiceUri + '/User/getUserById',
      {
        params: {userId}
      }).pipe(
      tap((user: UserResponse) => {
        this.localStorageService.set('user', user);
      })
    );
  }

  isAdmin(): boolean {
    const user: UserResponse = this.localStorageService.get('user');
    if (user) {
      return user.isAdmin;
    }
    return false;
  }

  getCurrentUser(): UserResponse | null {
    const user: UserResponse = this.localStorageService.get('user');
    return (user) ? user : null;
  }
}
