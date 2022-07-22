import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatusType } from '@api/project-service/models/project-status-type';

@Pipe({
	name: 'endDateLabel',
})
export class EndDateLabelPipe implements PipeTransform {
	transform(type: ProjectStatusType): string {
		return type === ProjectStatusType.Suspend ? 'Дата приостановки' : 'Дата завершения';
	}
}
