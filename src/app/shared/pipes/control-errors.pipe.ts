import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
	name: 'controlErrors',
})
export class ControlErrorsPipe implements PipeTransform {
	transform(errors: ValidationErrors | null): string {
		let error = '';
		if (errors) {
			const errorKey = Object.keys(errors)[0];
			error = errors[errorKey]?.message || 'Ошибка!';
		}
		return error;
	}
}
