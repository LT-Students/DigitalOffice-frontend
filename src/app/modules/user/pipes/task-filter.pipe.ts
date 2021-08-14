//@ts-nocheck
import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '@app/models/project/project.model';

@Pipe({
	name: 'taskFilter',
})
export class TaskFilterPipe implements PipeTransform {
	transform<T>(list: Project[], filterText: string): any {
		return list
			? list.map((item) => ({
					...item,
					tasks: item.getTasks().filter((task) => task?.description.includes(filterText)),
			  }))
			: [];
	}
}
