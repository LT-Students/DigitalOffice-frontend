import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Constants } from '../../core/constants/constants';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectApiPath = this.constants.PROJECT_SERVICE_ENDPOINT + 'project';
  private userApiPath = this.constants.PROJECT_SERVICE_ENDPOINT + 'user';

  constructor(private constants: Constants, private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectApiPath}/getProjects`);
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.projectApiPath}/getProjectById`, {
      params: new HttpParams().set('projectId', projectId),
    });
  }
}
