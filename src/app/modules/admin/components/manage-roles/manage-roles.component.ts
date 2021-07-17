import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { RoleInfo } from '@data/api/rights-service/models';
import { RoleApiService } from '@data/api/rights-service/services';
import { PageEvent } from '@angular/material/paginator';
import { NewRoleComponent } from '../new-role/new-role.component';

@Component({
	selector: 'do-manage-roles',
	templateUrl: './manage-roles.component.html',
	styleUrls: ['./manage-roles.component.scss'],
})
export class ManageRolesComponent {
	public roles: RoleInfo[];
	public totalCount: number;

	constructor(public roleApiService: RoleApiService) {}

	public onAddRoleClick({skipCount, takeCount, dialog}): void {
		dialog
		.open(NewRoleComponent)
		.afterClosed()
		.subscribe(() => this.getRoleList(skipCount, takeCount));
	}

	public getRoleList(skipCount = 0, takeCount = 10) {
		return this.roleApiService.findRoles({skipCount, takeCount}).subscribe(data => {
			console.log('Data from getList: ', data)
			this.roles = data.roles;
			this.totalCount = data.totalCount;
		})
	}
}
