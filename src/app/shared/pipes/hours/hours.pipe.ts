import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'hours'
})
export class HoursPipe implements PipeTransform {

	transform(timeInMinutes: number): string {
		const hours = Math.floor(timeInMinutes / 60).toString().padStart(2, '0');
		const minutes = (timeInMinutes % 60).toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	}

}
