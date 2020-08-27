import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserResponse } from '../interfaces/user-response.interface';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { environment  } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) { }

  getUser(userId: string): Observable<IUserResponse>{
    return this.http.get<IUserResponse>(environment.userServiceUri + '/User/getUserById',
    { 
      params: { userId: userId } 
    })
  }

  isAdmin(): boolean{
    const user: IUserResponse = this.localStorageService.get("user");
    if(user){
      return user.isAdmin;
    }
    return false;
  }
}
