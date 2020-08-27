import {Component, Input, OnInit} from '@angular/core';
import { IUser, IUserResponse } from '../../interfaces/user-response.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'do-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public user: IUserResponse;

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
  }

}
