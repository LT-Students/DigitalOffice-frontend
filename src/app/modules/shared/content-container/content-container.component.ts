import { Component, OnInit } from '@angular/core';

import { User } from '@digital-office/api/user-service';

import { UserService } from '../../../services/user.service';

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
