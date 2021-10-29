import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { DepartmentService, IGetDepartment } from '@app/services/company/department.service';

@Injectable({
	providedIn: 'root',
})
export class DepartmentPageResolver implements Resolve<OperationResultResponse<IGetDepartment>> {
	constructor(private _departmentService: DepartmentService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<IGetDepartment>> {
		return this._departmentService.getDepartment({
			departmentid: route.params.id,
			includeprojects: false,
			includeusers: true,
		});
	}
}
