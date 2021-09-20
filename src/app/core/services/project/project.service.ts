import { Injectable } from '@angular/core';
import { ProjectApiService } from '@data/api/project-service/services/project-api.service';
import { Observable } from 'rxjs';
import {
	AddUsersToProjectRequest,
	EditProjectRequest,
	FindResponseProjectInfo,
	ImageContent,
	OperationResultResponse,
	OperationResultResponseProjectResponse,
	ProjectStatusType,
	ProjectUserRequest,
} from '@data/api/project-service/models';
import { UserApiService } from '@data/api/project-service/services/user-api.service';
import { UUID } from '@app/types/uuid.type';

export interface IGetProjectRequest {
	projectId: string;
	includeusers?: boolean;
	shownotactiveusers?: boolean;
	includefiles?: boolean;
}

export interface IEditProjectRequest {
	projectId: string;
	body: EditProjectRequest;
}

export interface IRemoveUsersFromProjectRequest {
	projectId: string;
	userIds: UUID[];
}

export interface ICreateProjectRequest {
	departmentId?: string;
	description?: string;
	name: string;
	projectImages: Array<ImageContent>;
	shortDescription?: string;
	shortName?: string;
	status: ProjectStatusType;
	users: Array<ProjectUserRequest>;
}

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(private _projectService: ProjectApiService, private _userService: UserApiService) {}

	public findProjects(skipPages = 0, pageSize = 10, departmentId = undefined): Observable<FindResponseProjectInfo> {
		return this._projectService.findProjects({
			skipCount: skipPages,
			takeCount: pageSize,
			departmentid: departmentId,
		});
	}

	public getProject(params: IGetProjectRequest): Observable<OperationResultResponseProjectResponse> {
		return this._projectService.getProject(params);
	}

	public createProject(body: ICreateProjectRequest): Observable<OperationResultResponse> {
		return this._projectService.createProject({ body });
	}

	public editProject(params: IEditProjectRequest): Observable<OperationResultResponse> {
		return this._projectService.editProject(params);
	}

	public addUsersToProject(body: AddUsersToProjectRequest): Observable<void> {
		return this._userService.addUsersToProject({ body });
	}

	public removeUsersFromProject(params: IRemoveUsersFromProjectRequest): Observable<void> {
		return this._userService.removeUsersFromProject(params);
	}
}
