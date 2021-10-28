import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RoleInfo } from '@data/api/rights-service/models';
import { RightsService } from '@app/services/rights/rights.service';
import { PageEvent } from '@angular/material/paginator';
import { ModalService } from '@app/services/modal.service';
import { iif, Observable, ReplaySubject } from 'rxjs';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { IFindRequest } from '@app/types/find-request.interface';
import { ActivatedRoute } from '@angular/router';
import { NewRoleComponent } from '../../modals/new-role/new-role.component';

@Component({
	selector: 'do-manage-roles',
	templateUrl: './manage-roles.component.html',
	styleUrls: ['./manage-roles.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageRolesComponent {
	private _rolesParams: ReplaySubject<IFindRequest>;
	public roles$: Observable<OperationResultResponse<RoleInfo[]>>;

	constructor(
		private _modalService: ModalService,
		private _rightsService: RightsService,
		private _route: ActivatedRoute
	) {
		this._rolesParams = new ReplaySubject<IFindRequest>(1);
		this.roles$ = this._rolesParams.pipe(
			startWith(null),
			switchMap((params: IFindRequest | null) =>
				iif(
					() => !!params,
					this._rightsService.findRoles(params as IFindRequest),
					this._route.data.pipe(map((response) => response.roles))
				)
			)
		);
	}

	public onPageChange(event: PageEvent): void {
		this._rolesParams.next({
			skipCount: event.pageIndex * event.pageSize,
			takeCount: event.pageSize,
		});
	}

	public onAddRoleClick(): void {
		this._modalService
			.openModal<NewRoleComponent, null, any>(NewRoleComponent)
			.afterClosed()
			.pipe(withLatestFrom(this._rolesParams))
			.subscribe(([result, params]) => {
				if (result?.status === 0) {
					this._rolesParams.next(params);
				}
			});
	}
}
