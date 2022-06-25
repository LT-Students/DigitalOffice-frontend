import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { CreateEditProject } from '../create-edit-project';
import { ProjectService } from '../../project.service';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';
import { FormValue } from './project-form.service';

@Injectable({
	providedIn: 'root',
})
export class EditProjectService implements CreateEditProject {
	public pageConfig = { title: 'Редактирование проекта', submitButtonLabel: 'Сохранить' };
	public readonly isEditMode = true;

	constructor(private projectService: ProjectService, private selectedProject: SelectedProjectService) {}

	public submit$(formValue: FormValue): Observable<string> {
		return this.selectedProject.project$.pipe(
			first(),
			map((projectRes: ProjectResponse) => projectRes.project.id)
			// switchMap((project: ProjectInfo) => {
			// 	return this.projectService.editProject(project.id, editRequest).pipe(
			// 		switchMap(() => this.projectService.getProject(project.id)),
			// 		tap((project: ProjectResponse) => this.selectedProject.setProject(project)),
			// 		mapTo(project.id)
			// 	);
			// })
		);
	}
}
