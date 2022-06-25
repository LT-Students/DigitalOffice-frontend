import { Injectable } from '@angular/core';
import { ProjectApiService } from '@api/project-service/services/project-api.service';
import { map } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { CreateProjectRequest } from '@api/project-service/models/create-project-request';
import { EditRequest, ProjectPath } from '@app/types/edit-request';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(private projectService: ProjectApiService) {}

	public getProject(projectId: string): Observable<ProjectResponse> {
		return this.projectService
			.getProject({
				projectId: projectId,
				includeusers: true,
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
}
