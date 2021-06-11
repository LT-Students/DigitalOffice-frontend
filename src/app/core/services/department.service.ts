import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ProjectsResponse } from '@data/api/project-service/models/projects-response';
import { departments } from '../../modules/employee/mock';

@Injectable({
	providedIn: 'root',
})
export class DepartmentService {
	constructor(private _departmentService: DepartmentApiService) {}

	public getDepartments(): Observable<DepartmentInfo[]> {
		return of(departments);
	}
}
