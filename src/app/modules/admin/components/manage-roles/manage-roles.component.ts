import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { RoleInfo } from '@data/api/rights-service/models';
import { RoleApiService } from '@data/api/rights-service/services';
import { NewRoleComponent } from '../new-role/new-role.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'app-manage-roles',
	templateUrl: './manage-roles.component.html',
	styleUrls: ['./manage-roles.component.scss'],
})
export class ManageRolesComponent implements OnInit {
	public roles: RoleInfo[];

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

	constructor(private dialog: MatDialog, private roleApiService: RoleApiService) {
		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
	}

	public ngOnInit(): void {
		this.roleApiService.findRoles({ skipCount: this.pageIndex, takeCount: this.pageSize }).subscribe((res) => {
			this.totalCount = res.totalCount;
			this.roles = res.roles;
		});
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this.roleApiService.findRoles({ skipCount: this.pageIndex, takeCount: this.pageSize }).subscribe((data) => {
			this.roles = data.roles;
		});
	}

	public onAddRoleClick(): void {
		this.dialog.open(NewRoleComponent);
	}
}
