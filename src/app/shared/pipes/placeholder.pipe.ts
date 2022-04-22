import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {
	transform(value: any, replaceText: string = 'Не указано'): any {
		return value === 'undefined' || value === null || 0 === value.length ? replaceText : value;
	}
}
