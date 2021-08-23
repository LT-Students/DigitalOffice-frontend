import { Injectable } from '@angular/core';
import { ProjectApiService } from '@data/api/project-service/services/project-api.service';
import { ProjectRequest } from '@data/api/project-service/models/project-request';
import { Observable, of } from 'rxjs';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import {
	AddUsersToProjectRequest,
	EditProjectRequest,
	FindResponseProjectInfo,
	OperationResultResponseProjectInfo,
	ProjectResponse,
} from '@data/api/project-service/models';
import { PositionInfo } from '@data/api/user-service/models/position-info';
import { UserApiService } from '@data/api/project-service/services/user-api.service';
import { UUID } from '@app/types/uuid.type';
import { positions, projects } from '../../../modules/employee/mock';

export interface IGetProjectRequest {

	/**
	 * Project global unique identifier.
	 */
	projectId: string;
	includeusers?: boolean;
	shownotactiveusers?: boolean;
	includefiles?: boolean;
}

export interface IEditProjectRequest {
	/**
	 * Project global unique identifier.
	 */
	projectId: string;
	body: EditProjectRequest
}

export interface IRemoveUsersFromProjectRequest {
	/**
	 * Project global unique identifier.
	 */
	projectId: string;
	userIds: UUID[];
}

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(
		private _projectService: ProjectApiService,
		private _userService: UserApiService
	) {}

	public findProjects(skipPages = 0, pageSize = 10): Observable<FindResponseProjectInfo> {
		return this._projectService.findProjects({ skipCount: skipPages, takeCount: pageSize });
		// .pipe(switchMap((projects: FindResponseProjectInfo) => of(projects.body)));
	}

	public getProject(params: IGetProjectRequest): Observable<ProjectResponse> {
		return this._projectService.getProject(params);
	}

	public createProject(body: ProjectRequest): Observable<OperationResultResponseProjectInfo> {
		return this._projectService.createProject({ body });
	}

	public editProject(params: IEditProjectRequest): Observable<OperationResultResponseProjectInfo> {
		return this._projectService.editProject(params);
	}

	public addUsersToProject(body: AddUsersToProjectRequest): Observable<void> {
		return this._userService.addUsersToProject({ body });
	}

	public removeUsersFromProject(params: IRemoveUsersFromProjectRequest): Observable<void> {
		return this._userService.removeUsersFromProject(params);
	}

	/*TODO: переделать, когда бэк сделает корректную схему для findProjects */
	// public getUserProjectsInfo(projects: ProjectInfo[]): Observable<ProjectInfo[]> {
	// 	return forkJoin(
	// 		projects.map((project: ProjectInfo) => {
	// 			return this._projectService
	// 				.getProject({ projectId: project.id })
	// 				.pipe(switchMap((projectExpanded: ProjectResponse) => of(projectExpanded.project)));
	// 		})
	// 	);
	// }

	public getMockUserProjectsInfo(): Observable<ProjectInfo[]> {
		return of(projects);
	}

	public getProjectPositions(): Observable<PositionInfo[]> {
		return of(positions);
	}
}
