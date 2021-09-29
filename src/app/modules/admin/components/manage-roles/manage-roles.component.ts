import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { OperationResultStatusType, RoleInfo, OperationResultResponse } from '@data/api/rights-service/models';
import { RightsService } from '@app/services/rights/rights.service';
import { PageEvent } from '@angular/material/paginator';
import { NewRoleComponent } from '../../modals/new-role/new-role.component';
import { ModalService } from '@app/services/modal.service';

export interface Path {
	title: string;
	url?: string;
}

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
	public paths: Path[];

	constructor(
		private _modalService: ModalService,
		private _rightsService: RightsService,
		private _cdr: ChangeDetectorRef
	) {
		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
		this.roles = [];
		this.paths = [];
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
		this._modalService
			.openModal<NewRoleComponent, null, any>(NewRoleComponent)
			.afterClosed()
			.subscribe(result => {
				console.log('RES: ', result?.status)
				if (result?.status === 0) {
					this._getRoleList();
				}
			});
	}

	private _getRoleList(): void {
		this._rightsService.findRoles({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize }).subscribe((res) => {
			this.totalCount = res.totalCount ?? 0;
			this.roles = res.roles ?? [];
			this._cdr.markForCheck();
		});
	}
}
