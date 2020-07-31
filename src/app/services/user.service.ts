import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  isAuthenticated():boolean{
    return false;
  }

  signin(){
    
  }
}
