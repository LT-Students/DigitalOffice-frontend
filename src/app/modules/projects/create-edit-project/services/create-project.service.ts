import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProjectRequest } from '@api/project-service/models/create-project-request';
import { getUTCWithOffset } from '@app/utils/utils';
import { CreateEditProject } from '../create-edit-project';
import { ProjectService } from '../../project.service';
import { FormValue } from './project-form.service';

@Injectable()
export class CreateProjectService implements CreateEditProject {
	public pageConfig = { title: 'Создание проекта', submitButtonLabel: 'Создать проект' };
	public readonly isEditMode = false;

	constructor(private projectService: ProjectService) {}

	public submit$(formValue: FormValue): Observable<string> {
		const body: CreateProjectRequest = {
			name: formValue.info.name,
			shortName: formValue.info.shortName,
			customer: formValue.info.customer,
			status: formValue.details.status,
			startDateUtc: getUTCWithOffset(formValue.details.startDate),
			endDateUtc: formValue.details.endDate && getUTCWithOffset(formValue.details.endDate),
			description: formValue.description.description,
			shortDescription: formValue.description.shortDescription,
			departmentId: formValue.info.department as string,
			projectImages: [],
			users: [],
		};
		return this.projectService.createProject(body);
	}
}
