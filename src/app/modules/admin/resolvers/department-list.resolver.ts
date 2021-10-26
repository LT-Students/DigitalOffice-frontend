import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { DepartmentService } from '@app/services/company/department.service';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';

@Injectable({
	providedIn: 'root',
})
export class DepartmentListResolver implements Resolve<OperationResultResponse<DepartmentInfo[]>> {
	constructor(private _departmentService: DepartmentService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<DepartmentInfo[]>> {
		return this._departmentService.findDepartments({ skipCount: 0, takeCount: 10 });
	}
}
