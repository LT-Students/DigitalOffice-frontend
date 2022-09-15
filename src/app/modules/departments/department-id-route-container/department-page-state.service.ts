import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { UserInfo } from '@api/department-service/models/user-info';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { booleanGuard } from '@app/utils/utils';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../department-page/department';
import { DepartmentService } from '../services/department.service';

export class DepartmentPageState {
	public department: Department;
	public users: UserInfo[];
	public projects: ProjectInfo[];

	constructor(department: Department, users?: UserInfo[], projects?: ProjectInfo[]) {
		this.department = department;
		this.users = users || [];
		this.projects = projects || [];
	}
}

@Injectable()
export class DepartmentPageStateService {
	private departmentState: BehaviorSubject<DepartmentPageState>;
	public get departmentState$(): Observable<DepartmentPageState> {
		return this.departmentState.asObservable();
	}

	public get department$(): Observable<Department> {
		return this.departmentState$.pipe(
			filter(booleanGuard),
			map((state: DepartmentPageState) => state.department)
		);
	}

	constructor(private departmentService: DepartmentService, route: ActivatedRoute) {
		const { department, users, projects } = route.snapshot.data;
		const initialState = new DepartmentPageState(department, users, projects);
		this.departmentState = new BehaviorSubject(initialState);
	}

	public refreshDepartment(): Observable<Department> {
		return this.departmentState$.pipe(
			first(),
			switchMap((state: DepartmentPageState) =>
				this.departmentService.getDepartment(state.department.id).pipe(
					tap((d: Department) => {
						this.departmentState.next({ ...state, department: d });
					})
				)
			)
		);
	}
}
