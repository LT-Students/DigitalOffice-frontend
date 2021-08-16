//@ts-nocheck
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { RoleInfo } from '@data/api/rights-service/models';
import { RoleApiService } from '@data/api/rights-service/services';
import { PageEvent } from '@angular/material/paginator';
import { NewRoleComponent } from '../../modals/new-role/new-role.component';

@Component({
	selector: 'do-manage-roles',
	templateUrl: './manage-roles.component.html',
	styleUrls: ['./manage-roles.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
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
		this._getRoleList();
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getRoleList();
	}

	public onAddRoleClick(): void {
		this.dialog.open(NewRoleComponent);
	}

	private _getRoleList(): void {
		this.roleApiService.findRoles({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize }).subscribe((res) => {
			this.totalCount = res.totalCount;
			this.roles = res.roles;
		});
	}
}
