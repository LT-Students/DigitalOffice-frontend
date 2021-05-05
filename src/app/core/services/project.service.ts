import { Injectable } from '@angular/core';
import { ProjectApiService } from '@data/api/project-service/services/project-api.service';
import { ProjectRequest } from '@data/api/project-service/models/project-request';
import { Observable } from 'rxjs';
import { ProjectInfo } from '@data/api/user-service/models/project-info';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private _projectApiService: ProjectApiService) {
    }

    public createProject(request: ProjectRequest): Observable<ProjectInfo> {
        return this._projectApiService.createProject({ body: request });
    }
}
