import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NewRoleComponent } from '../new-role/new-role.component';
import { ROLES, Role } from './mock-roles'

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent implements OnInit {

  roles: Role[]
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.roles = ROLES
  }

  onAddRoleClick(): void {
    this.dialog.open(NewRoleComponent)
  }
}
