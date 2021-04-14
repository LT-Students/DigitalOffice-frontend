import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/services/user.service';
import { IUser } from '@data/models/user';

@Component({
  selector: 'do-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
})
export class ContentContainerComponent implements OnInit {
  user: IUser;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if (!this.user) {
      this.user = {
        firstName: 'сотрудник',
        lastName: 'сотрудник',
      };
    }
  }
}
