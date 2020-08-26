import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserResponse } from '../interfaces/user-response.interface';
import { HttpClient } from '@angular/common/http';
import { environment  } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userId: string): Observable<IUserResponse>{
    return this.http.get<IUserResponse>(environment.userServiceUri + '/User/getUserById',
    { 
      params: { userId: userId } 
    })
  }
}
