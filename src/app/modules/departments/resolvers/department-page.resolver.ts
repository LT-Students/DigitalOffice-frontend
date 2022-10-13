import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DepartmentService } from '../services/department.service';
import { Department } from '../department-page/department';

@Injectable({
	providedIn: 'root',
})
export class DepartmentPageResolver implements Resolve<Department> {
	constructor(private departmentService: DepartmentService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Department> {
		const departmentId = route.params['id'];
		console.log('department page');
		return this.departmentService.getDepartment(departmentId);
	}
}
