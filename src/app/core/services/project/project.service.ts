import { Injectable } from '@angular/core';
import { ProjectApiService } from '@api/project-service/services/project-api.service';
import { Observable } from 'rxjs';
import {
	CreateProjectRequest,
	EditProjectRequest,
	ProjectInfo,
	ProjectResponse,
	ProjectStatusType,
	ProjectUserRoleType,
} from '@api/project-service/models';
import { UserApiService } from '@api/project-service/services/user-api.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { UUID } from '@app/types/uuid.type';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';

export interface IGetProjectRequest {
	projectId: string;
	includeusers?: boolean;
	shownotactiveusers?: boolean;
	includefiles?: boolean;
	includeimages?: boolean;
}

export interface IEditProjectRequest {
	projectId: string;
	body: EditProjectRequest;
}

export interface ICreateUserRequest {
	role: ProjectUserRoleType;
	userId: string;
}

export interface IAddUsersToProjectRequest {
	projectId: string;
	users: Array<ICreateUserRequest>;
}

export interface IRemoveUsersFromProjectRequest {
	projectId: string;
	body: UUID[];
}

export interface IFindProjects {
	includedepartment?: boolean;
	isascendingsort?: boolean;
	projectstatus?: ProjectStatusType;
	nameincludesubstring?: string;
	skipCount: number;
	takeCount: number;
	userid?: string;
	departmentid?: string;
}

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(
		private _projectService: ProjectApiService,
		private _userService: UserApiService,
		private _responseMessage: ResponseMessageModel
	) {}

	public findProjects(params: IFindProjects): Observable<OperationResultResponse<ProjectInfo[]>> {
		return this._projectService.findProjects(params);
	}

	public getProject(params: IGetProjectRequest): Observable<OperationResultResponse<ProjectResponse>> {
		return this._projectService.getProject(params);
	}

	public createProject(body: CreateProjectRequest): Observable<OperationResultResponse<{}>> {
		return this._projectService
			.createProject({ body })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Project, MessageMethod.Create));
	}

	public editProject(params: IEditProjectRequest): Observable<OperationResultResponse<{}>> {
		return this._projectService.editProject(params);
	}

	public addUsersToProject(body: IAddUsersToProjectRequest): Observable<OperationResultResponse<{}>> {
		return this._userService.createProjectUsers({ body });
	}

	public removeUsersFromProject(params: IRemoveUsersFromProjectRequest): Observable<OperationResultResponse<{}>> {
		return this._userService.removeProjectUsers(params);
	}
}
