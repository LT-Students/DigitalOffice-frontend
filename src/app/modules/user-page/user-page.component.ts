import {Component, Input, OnInit} from '@angular/core';
import { IUser } from '../../interfaces/user-response.interface';

@Component({
  selector: 'do-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public user: IUser;

  constructor() {
    this.user = {
      firstName: 'Петр',
      lastName: 'Петров',
      photo: 'url'
    }
  }

  ngOnInit() {

  }

}
