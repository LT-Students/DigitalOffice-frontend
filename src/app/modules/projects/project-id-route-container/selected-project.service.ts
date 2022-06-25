import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ProjectResponse } from '@api/project-service/models/project-response';

@Injectable()
export class SelectedProjectService {
	private project = new ReplaySubject<ProjectResponse>(1);
	public project$ = this.project.asObservable();

	constructor() {}

	public setProject(project: ProjectResponse): void {
		this.project.next(project);
	}
}
