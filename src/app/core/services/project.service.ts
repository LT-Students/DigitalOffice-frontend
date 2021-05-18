import { Injectable } from '@angular/core';
import { ProjectApiService } from '@data/api/project-service/services/project-api.service';
import { ProjectRequest } from '@data/api/project-service/models/project-request';
import { forkJoin, Observable, of } from 'rxjs';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { switchMap } from 'rxjs/operators';
import { ProjectExpandedResponse, ProjectsResponse } from '@data/api/project-service/models';
import { departments, positions, projects } from '../../modules/employee/mock';
import { PositionInfo } from '@data/api/user-service/models/position-info';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private _projectApiService: ProjectApiService) {
    }

    public createProject(request: ProjectRequest): Observable<ProjectInfo> {
        return this._projectApiService.createProject({ body: request });
    }

    public getProjects(): Observable<ProjectInfo[]> {
        return this._projectApiService.findprojects({ skipCount: 0, takeCount: 10 })
        .pipe(
            switchMap((projects: ProjectsResponse) => of(projects.body)),
        );
    }

    public getUserProjectsInfo(projects: ProjectInfo[]): Observable<ProjectInfo[]> {
        return forkJoin(projects.map((project: ProjectInfo) => {
                return this._projectApiService.getProjectById({ projectId: project.id })
                .pipe(
                    switchMap((projectExpanded: ProjectExpandedResponse) => of(projectExpanded.project)),
                );
            }),
        );
    }

    public getMockUserProjectsInfo(): Observable<ProjectInfo[]> {
        return of(projects);
    }

    public getProjectPositions(): Observable<PositionInfo[]> {
        return of(positions);
    }
}
