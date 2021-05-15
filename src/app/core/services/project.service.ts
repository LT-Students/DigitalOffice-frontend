import { Injectable } from '@angular/core';
import { ProjectApiService } from '@data/api/project-service/services/project-api.service';
import { ProjectRequest } from '@data/api/project-service/models/project-request';
import { forkJoin, Observable, of } from 'rxjs';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { switchMap } from 'rxjs/operators';
import { ProjectExpandedResponse } from '@data/api/project-service/models';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private _projectApiService: ProjectApiService) {
    }

    public createProject(request: ProjectRequest): Observable<ProjectInfo> {
        return this._projectApiService.createProject({ body: request });
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
}
