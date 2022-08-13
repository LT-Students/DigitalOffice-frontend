import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { DepartmentService } from '@app/services/department/department.service';
import { DepartmentResponse } from '@api/department-service/models/department-response';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class DepartmentPageResolver implements Resolve<DepartmentResponse> {
	constructor(private departmentService: DepartmentService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DepartmentResponse> {
		return this.departmentService
			.getDepartment({
				departmentId: route.params.id,
				includeProjects: false,
				includeUsers: true,
				includeNews: false,
			})
			.pipe(map((res: OperationResultResponse<DepartmentResponse>) => res.body as DepartmentResponse));
	}
}
