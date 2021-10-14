import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { RoleInfo } from '@data/api/rights-service/models';
import { RightsService } from '@app/services/rights/rights.service';
import { PageEvent } from '@angular/material/paginator';
import { ModalService } from '@app/services/modal.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NewRoleComponent } from '../../modals/new-role/new-role.component';

@Component({
	selector: 'do-manage-roles',
	templateUrl: './manage-roles.component.html',
	styleUrls: ['./manage-roles.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageRolesComponent {
	public roles$: Observable<RoleInfo[]>;

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

	constructor(private _modalService: ModalService, private _rightsService: RightsService) {
		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
		this.roles$ = this._getRoleList();
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
			.subscribe((result) => {
				console.log('RES: ', result?.status);
				if (result?.status === 0) {
					this.roles$ = this._getRoleList();
				}
			});
	}

	private _getRoleList(): Observable<RoleInfo[]> {
		return this._rightsService
			.findRoles({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize })
			.pipe(
				tap((res) => {
					this.totalCount = res.totalCount ?? 0;
				}),
				map((res) => res.body ?? [])
			);
	}
}
