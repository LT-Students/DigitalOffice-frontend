import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'join',
})
export class JoinPipe implements PipeTransform {
	transform(arr: Array<any>, separator?: string): string {
		return arr.join(separator);
	}
}
