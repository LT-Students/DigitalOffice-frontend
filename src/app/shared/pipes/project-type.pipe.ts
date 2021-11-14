import { Pipe, PipeTransform } from '@angular/core';
import { IProjectStatusType, ProjectTypeModel } from '@app/models/project/project-status';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { ILeaveType } from '@app/models/time/leave-type.model';

@Pipe({
	name: 'projectType',
})
export class ProjectTypePipe implements PipeTransform {
	transform(type: ProjectStatusType | undefined): string {
		if (!type) return '';
		else {
			const projectTypeModel: IProjectStatusType | undefined = ProjectTypeModel.getProjectType(type);
			return `${projectTypeModel?.name ?? ''}`;
		}
	}
}
