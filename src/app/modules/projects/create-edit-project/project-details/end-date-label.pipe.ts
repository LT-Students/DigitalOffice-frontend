import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatusType } from '@api/project-service/models/project-status-type';

const endDateLabels = {
	[ProjectStatusType.Active]: 'Дата предполагаемого завершения',
	[ProjectStatusType.Suspend]: 'Дата приостановки',
	[ProjectStatusType.Closed]: 'Дата завершения',
};

@Pipe({
	name: 'endDateLabel',
})
export class EndDateLabelPipe implements PipeTransform {
	transform(type: ProjectStatusType): string {
		return endDateLabels[type];
	}
}
