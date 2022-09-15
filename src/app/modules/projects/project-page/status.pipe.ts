import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatusType } from '@api/project-service/models/project-status-type';
import { IProjectStatus, ProjectStatus } from '../models/project-status';

@Pipe({
	name: 'status',
})
export class StatusPipe implements PipeTransform {
	transform(status: ProjectStatusType): IProjectStatus {
		return ProjectStatus.getStatusByType(status);
	}
}
