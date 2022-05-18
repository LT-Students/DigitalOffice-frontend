import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'execute',
})
export class ExecutePipe implements PipeTransform {
	transform(value: any, func: (value: any) => any): any {
		return func(value);
	}
}
