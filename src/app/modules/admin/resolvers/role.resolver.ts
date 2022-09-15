import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { RightsService } from '@app/services/rights/rights.service';
import { RoleInfo } from '@api/rights-service/models/role-info';

@Injectable({
	providedIn: 'root',
})
export class RoleResolver implements Resolve<OperationResultResponse<RoleInfo[]>> {
	constructor(private _roleService: RightsService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<RoleInfo[]>> {
		return this._roleService.findRoles({ skipCount: 0, takeCount: 10 });
	}
}
