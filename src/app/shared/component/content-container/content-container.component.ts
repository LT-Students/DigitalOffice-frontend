import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/services/user.service';
import { User } from '@data/api/user-service/models/user';

@Component({
  selector: 'do-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
})
export class ContentContainerComponent implements OnInit {
  user: User;

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
