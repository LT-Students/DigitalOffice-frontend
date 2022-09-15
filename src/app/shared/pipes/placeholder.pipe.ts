import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {
	transform(value: any, replaceText: string = 'Не указано'): any {
		return value == null || value.length === 0 ? replaceText : value;
	}
}
