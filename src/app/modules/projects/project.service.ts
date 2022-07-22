import { Injectable } from '@angular/core';
import { ProjectApiService } from '@api/project-service/services/project-api.service';
import { map } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { CreateProjectRequest } from '@api/project-service/models/create-project-request';
import { EditRequest, ProjectPath } from '@app/types/edit-request';
import { FileApiService } from '@api/project-service/services/file-api.service';
import { FileInfo } from '@api/project-service/models/file-info';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { IFindProjects } from '@app/services/project/project.service';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(private projectService: ProjectApiService, private fileService: FileApiService) {}

	public findProjects(params: IFindProjects): Observable<OperationResultResponse<ProjectInfo[]>> {
		params = { ...params, includedepartment: true };
		return this.projectService.findProjects(params);
	}

	public getProject(projectId: string): Observable<ProjectResponse> {
		return this.projectService
			.getProject({
				projectId: projectId,
				includefiles: true,
				includeimages: true,
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

	public addFiles(projectId: string, files: FileInfo[]): Observable<any> {
		return this.fileService
			.createFile({ body: { projectId, files } })
			.pipe(map((res: OperationResultResponse) => res.body));
	}
}
