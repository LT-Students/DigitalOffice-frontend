import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'taskFilter',
})
export class TaskFilterPipe implements PipeTransform {
	transform(list: any[], filterText: string): any {
		return list
			? list.map((item) => ({
					...item,
					tasks: item.tasks.filter((task) => task.description.includes(filterText)),
			  }))
			: [];
	}
}
