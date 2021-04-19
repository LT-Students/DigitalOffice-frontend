import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/services/user.service';
import { IUser } from '@data/models/user';
import { UserInfo, UserResponse } from '@data/api/user-service/models';

@Component({
  selector: 'do-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
})
export class ContentContainerComponent implements OnInit {
  user: UserInfo;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser().user;
    if (!this.user) {
      this.user = {
        firstName: 'сотрудник',
        lastName: 'сотрудник',
      };
    }
  }
}
