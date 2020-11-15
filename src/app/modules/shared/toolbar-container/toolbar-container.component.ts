import { Component, OnInit } from '@angular/core';

import { User } from '@digital-office/api/user-service';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'do-toolbar-container',
  templateUrl: './toolbar-container.component.html',
  styleUrls: ['./toolbar-container.component.scss'],
})
export class ToolbarContainerComponent implements OnInit {
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
