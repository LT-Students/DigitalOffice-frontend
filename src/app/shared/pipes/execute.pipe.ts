import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'execute',
})
export class ExecutePipe implements PipeTransform {
	transform(value: any, func: (value: any) => any, context?: any): any {
		if (context) {
			return func.call(context, value);
		}
		return func(value);
	}
}
