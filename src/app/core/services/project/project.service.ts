import { Inject, Injectable } from '@angular/core';
import { ProjectApiService } from '@data/api/project-service/services/project-api.service';
import { Observable, throwError } from 'rxjs';
import {
	EditProjectRequest,
	ImageContent,
	ImageInfo,
	// ProjectFileInfo,
	ProjectInfo,
	ProjectStatusType,
	ProjectUserRoleType,
	UserInfo,
} from '@data/api/project-service/models';
import { UserApiService } from '@data/api/project-service/services/user-api.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { UUID } from '@app/types/uuid.type';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';

export interface IGetProjectRequest {
	projectId: string;
	includeusers?: boolean;
	shownotactiveusers?: boolean;
	includefiles?: boolean;
	includeDescription?: boolean;
	includeShortDescription?: boolean;
}

export interface IGetProjectResponse {
	project?: ProjectInfo;
	users?: Array<UserInfo>;
	// files?: Array<ProjectFileInfo>;
	images?: Array<ImageInfo>;
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

export interface ICreateProjectRequest {
	departmentId?: string;
	description?: string;
	name: string;
	projectImages: Array<ImageContent>;
	shortDescription?: string;
	shortName?: string;
	status: ProjectStatusType;
	users: Array<ICreateUserRequest>;
}

export interface IFindProjects {
	skipCount: number;
	takeCount: number;
	departmentId?: string;
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

	public getProject(params: IGetProjectRequest): Observable<OperationResultResponse<IGetProjectResponse>> {
		return this._projectService.getProject(params);
	}

	public createProject(body: ICreateProjectRequest): Observable<OperationResultResponse<{}>> {
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
