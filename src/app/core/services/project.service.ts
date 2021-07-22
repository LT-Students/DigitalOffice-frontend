import { Injectable } from '@angular/core';
import { ProjectApiService } from '@data/api/project-service/services/project-api.service';
import { ProjectRequest } from '@data/api/project-service/models/project-request';
import { forkJoin, Observable, of } from 'rxjs';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { switchMap } from 'rxjs/operators';
import { FindResponseProjectInfo, OperationResultResponseProjectInfo, ProjectResponse } from '@data/api/project-service/models';
import { PositionInfo } from '@data/api/user-service/models/position-info';
import { departments, positions, projects } from '../../modules/employee/mock';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(private _projectApiService: ProjectApiService) {}

	public createProject(request: ProjectRequest): Observable<OperationResultResponseProjectInfo> {
		return this._projectApiService.createProject({ body: request });
	}

	public getProjectInfo(params: {
		projectId: string;
		includeusers?: boolean;
		shownotactiveusers?: boolean;
		includefiles?: boolean;
	}): Observable<ProjectResponse> {
		return this._projectApiService.getProject(params);
	}

	public getProjectList(skipPages = 0, pageSize = 10): Observable<FindResponseProjectInfo> {
		return this._projectApiService.findProjects({ skipCount: skipPages, takeCount: pageSize });
		// .pipe(switchMap((projects: FindResponseProjectInfo) => of(projects.body)));
	}

	public getUserProjectsInfo(projects: ProjectInfo[]): Observable<ProjectInfo[]> {
		return forkJoin(
			projects.map((project: ProjectInfo) => {
				return this._projectApiService
					.getProject({ projectId: project.id })
					.pipe(switchMap((projectExpanded: ProjectResponse) => of(projectExpanded.project)));
			})
		);
	}

	public getMockUserProjectsInfo(): Observable<ProjectInfo[]> {
		return of(projects);
	}

	public getProjectPositions(): Observable<PositionInfo[]> {
		return of(positions);
	}
}
