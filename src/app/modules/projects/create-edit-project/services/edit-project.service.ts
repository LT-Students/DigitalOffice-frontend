import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { EditRequest, ProjectPath } from '@app/types/edit-request';
import { CreateEditProject } from '../create-edit-project';
import { ProjectService } from '../../project.service';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';

@Injectable()
export class EditProjectService implements CreateEditProject {
	public pageConfig = { title: 'Редактирование проекта', submitButtonLabel: 'Сохранить' };
	public readonly isEditMode = true;

	constructor(private projectService: ProjectService, private selectedProject: SelectedProjectService) {}

	public submit$(editRequest: EditRequest<ProjectPath>): Observable<string> {
		return this.selectedProject.info$.pipe(
			first(),
			map((projectRes: ProjectResponse) => projectRes),
			switchMap((project: ProjectResponse) => {
				return editRequest.length
					? this.projectService.editProject(project.id, editRequest).pipe(
							switchMap(() => this.projectService.getProject(project.id)),
							tap((project: ProjectResponse) => this.selectedProject.setProject({ info: project })),
							mapTo(project.id)
					  )
					: of(project.id);
			})
		);
	}
}
