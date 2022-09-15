import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DepartmentService } from '@app/services/department/department.service';
import { MAX_INT32 } from '@app/utils/utils';
import { catchError, map } from 'rxjs/operators';
import { DepartmentInfo } from '@api/department-service/models/department-info';

//TODO move resolver to some global directory, because it may be used in many places
@Injectable({
	providedIn: 'root',
})
export class DepartmentFilterResolver implements Resolve<DepartmentInfo[]> {
	constructor(private departmentService: DepartmentService) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DepartmentInfo[]> {
		return this.departmentService.findDepartments({ skipCount: 0, takeCount: MAX_INT32 }).pipe(
			map((res) => res.body as DepartmentInfo[]),
			catchError(() => of([]))
		);
	}
}
