import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
	transform(text: string, index: number = 0): string {
		const arr = text.split(' ');
		arr[index] = arr[index].charAt(0).toUpperCase() + arr[index].slice(1);
		return arr.join(' ');
	}
}
