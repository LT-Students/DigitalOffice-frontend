import { Injectable } from '@angular/core';
import { ProjectApiService } from '@api/project-service/services/project-api.service';
import { map } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { CreateProjectRequest } from '@api/project-service/models/create-project-request';
import { EditRequest, ProjectPath } from '@app/types/edit-request';
import { FileApiService } from '@api/project-service/services/file-api.service';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { IFindProjects } from '@app/services/project/project.service';
import { UserApiService } from '@api/project-service/services/user-api.service';
import { UserInfo } from '@api/project-service/models/user-info';
import { MAX_INT32 } from '@app/utils/utils';
import { UserRequest } from '@api/project-service/models/user-request';
import { FileInfo } from '@api/project-service/models/file-info';
import { ProjectUserRoleType } from '@api/project-service/models/project-user-role-type';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { FileAccessType } from '@api/project-service/models/file-access-type';
import { DownloadFilesComponent } from './download-files/download-files.component';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(
		private projectService: ProjectApiService,
		private fileService: FileApiService,
		private projectUsersService: UserApiService,
		private dialog: DialogService
	) {}

	public findProjects(params: IFindProjects): Observable<OperationResultResponse<ProjectInfo[]>> {
		params = { ...params, includedepartment: true };
		return this.projectService.findProjects(params);
	}

	public getProject(projectId: string): Observable<ProjectResponse> {
		return this.projectService
			.getProject({
				projectId: projectId,
				includeprojectusers: true,
				includedepartment: true,
			})
			.pipe(map((res: OperationResultResponse) => res.body as ProjectResponse));
	}

	public createProject(body: CreateProjectRequest): Observable<string> {
		return this.projectService
			.createProject({ body })
			.pipe(map((res: OperationResultResponse) => res.body as string));
	}

	public editProject(projectId: string, editRequest: EditRequest<ProjectPath>): Observable<any> {
		return this.projectService
			.editProject({ projectId, body: editRequest })
			.pipe(map((res: OperationResultResponse) => res.body));
	}

	public getProjectUsers(projectId: string): Observable<UserInfo[]> {
		return this.projectUsersService
			.findUsers({
				projectId,
				includeAvatars: true,
				includePositions: true,
				isActive: true,
				skipCount: 0,
				takeCount: MAX_INT32,
			})
			.pipe(map((res: OperationResultResponse) => res.body));
	}

	public addUsers(projectId: string, users: UserRequest[]): Observable<any> {
		return this.projectUsersService.createProjectUsers({ body: { projectId, users } });
	}

	public removeUsers(projectId: string, userIds: string[]): Observable<any> {
		return this.projectUsersService.removeProjectUsers({ projectId, body: userIds });
	}

	public changeUserRole(
		projectId: string,
		userId: string,
		role: ProjectUserRoleType
	): Observable<OperationResultResponse> {
		return this.projectUsersService.editProjectUsers({ projectId, body: { usersIds: [userId], role } });
	}

	public findFiles(projectId: string): Observable<FileInfo[]> {
		return this.fileService
			.findFiles({ projectid: projectId, skipCount: 0, takeCount: MAX_INT32 })
			.pipe(map((res) => res.body as FileInfo[]));
	}

	public removeFiles(projectId: string, fileIds: string[]): Observable<OperationResultResponse> {
		return this.fileService.removeFile({ body: { projectId, filesIds: fileIds } });
	}

	public downloadFile(files: FileInfo | FileInfo[]): void {
		const filesArr = Array.isArray(files) ? files : [files];
		this.dialog.open(DownloadFilesComponent, { width: ModalWidth.S, data: filesArr });
	}

	public editFileAccess(fileId: string, newAccessType: FileAccessType): Observable<OperationResultResponse> {
		return this.fileService.editFile({ fileId, newAccessType });
	}
}
