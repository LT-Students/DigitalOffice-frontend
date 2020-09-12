import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { UserResponse } from '../../../../../libs/api/src/lib/user-service';

@Component({
  selector: 'app-toolbar-container',
  templateUrl: './toolbar-container.component.html',
  styleUrls: [ './toolbar-container.component.scss' ]
})
export class ToolbarContainerComponent implements OnInit {
  user: UserResponse;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if ( !this.user ) {
      this.user = {
        firstName: 'сотрудник',
        lastName: 'сотрудник'
      };
    }
  }

}
