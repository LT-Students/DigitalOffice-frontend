import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Department } from '../department-page/department';
import { DepartmentPageStateService } from '../department-id-route-container/department-page-state.service';

@Injectable({
	providedIn: 'root',
})
export class DepartmentPageResolver implements Resolve<Department> {
	constructor(private depState: DepartmentPageStateService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Department> {
		const departmentId = route.params['id'];
		return this.depState.resolveDepartment(departmentId);
	}
}
