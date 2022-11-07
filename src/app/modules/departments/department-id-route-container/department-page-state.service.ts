import { Injectable } from '@angular/core';
import { booleanGuard } from '@app/utils/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { Department } from '../department-page/department';
import { DepartmentService } from '../services/department.service';
import { DepartmentProjectsApiService } from '../department-page/department-projects/services/department-projects-api.service';
import { DepartmentUsersApiService } from '../department-page/department-users/services/department-users-api.service';
import { DepartmentUser } from '../department-page/department-users/models/department-user';

export interface DepartmentPageState {
	department: Department;
	projects?: FindResponse<ProjectInfo>;
	users?: FindResponse<DepartmentUser>;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentPageStateService {
	private state = new BehaviorSubject<DepartmentPageState | null>(null);
	public get state$(): Observable<DepartmentPageState> {
		return this.state.asObservable().pipe(filter(booleanGuard));
	}

	public get department$(): Observable<Department> {
		return this.state$.pipe(map((state: DepartmentPageState) => state.department));
	}

	public get projects$(): Observable<FindResponse<ProjectInfo>> {
		return this.state$.pipe(
			map((state: DepartmentPageState) => state.projects),
			filter(booleanGuard)
		);
	}

	public get users$(): Observable<FindResponse<DepartmentUser>> {
		return this.state$.pipe(
			map((state: DepartmentPageState) => state.users),
			filter(booleanGuard)
		);
	}

	constructor(
		private departmentService: DepartmentService,
		private departmentUsersApi: DepartmentUsersApiService,
		private departmentProjectApi: DepartmentProjectsApiService
	) {}

	private setDepartment(d: Department): void {
		const state = this.state.value;
		this.state.next({ ...state, department: d });
	}

	public resolveDepartment(id: string): Observable<Department> {
		return this.departmentService.getDepartment(id).pipe(tap(this.setDepartment.bind(this)));
	}

	public refreshDepartment(): Observable<Department> {
		return this.state$.pipe(
			first(),
			switchMap((state: DepartmentPageState) =>
				this.resolveDepartment(state.department.id).pipe(
					tap((d: Department) => {
						this.state.next({ ...state, department: d });
					})
				)
			)
		);
	}

	private setProjects(projects: FindResponse<ProjectInfo>): void {
		const state = this.state.value;
		if (state) {
			this.state.next({ ...state, projects });
		}
	}

	public resolveProjects(id: string): Observable<FindResponse<ProjectInfo>> {
		const state = this.state.value;
		if (state && state.projects) {
			return this.projects$;
		}
		return this.departmentProjectApi.findDepartmentProjects(id).pipe(tap(this.setProjects.bind(this)));
	}

	private setUsers(users: FindResponse<DepartmentUser>): void {
		const state = this.state.value;
		if (state) {
			this.state.next({ ...state, users });
		}
	}

	public resolveUsers(id: string): Observable<FindResponse<DepartmentUser>> {
		const state = this.state.value;
		if (state && state.users) {
			return this.users$;
		}
		return this.departmentUsersApi
			.findUsers(id, {
				isAscendingSort: true,
				departmentUserRoleAscendingSort: false,
			})
			.pipe(tap(this.setUsers.bind(this)));
	}

	public clearState(): void {
		this.state.next(null);
	}
}
