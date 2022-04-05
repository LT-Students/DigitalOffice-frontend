import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'fieldValue',
})
export class FieldValuePipe implements PipeTransform {
	transform(value: any, replaceText: string = 'Не указано'): string {
		return value === 'undefined' || value === null ? replaceText : value;
	}
}
