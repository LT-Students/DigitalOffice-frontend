import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NewRoleComponent } from '../new-role/new-role.component';
import { RoleApiService } from '@data/api/rights-service/services';
import { ROLES, Role } from './mock-roles';
import { RoleInfo, RolesResponse } from '@data/api/rights-service/models';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent implements OnInit {

  public roles: RoleInfo[];
  constructor(private dialog: MatDialog, private roleApiService: RoleApiService) { }

  public ngOnInit(): void {
    this.roleApiService.findRoles({skipCount: 0, takeCount: 25}).subscribe(res => this.roles = res.roles)
  }

  public onAddRoleClick(): void {
    this.dialog.open(NewRoleComponent);
  }
}
