import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatusType } from '@api/project-service/models/project-status-type';

class ProjectStatus {
	constructor(public label: string, public color: string) {}
}

const statusMap = new Map([
	[ProjectStatusType.Active, new ProjectStatus('Активный', '#ABF5C0')],
	[ProjectStatusType.Suspend, new ProjectStatus('Приостановлен', '#FFD89E')],
	[ProjectStatusType.Closed, new ProjectStatus('Закрыт', '#FFB2B2')],
]);

@Pipe({
	name: 'projectStatus',
})
export class ProjectStatusPipe implements PipeTransform {
	transform(value: ProjectStatusType): ProjectStatus {
		return statusMap.get(value) || new ProjectStatus('Error', '#000');
	}
}
