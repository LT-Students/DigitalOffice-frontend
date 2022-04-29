import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
	transform(word: string): string {
		let emoji = word.substr(0, word.indexOf(' '));
		let firstLetter = word.split(' ')[1].charAt(0).toUpperCase();
		let content = word.substr(word.indexOf(word.split(' ')[1].charAt(0)) + 1);
		return emoji + ' ' + firstLetter + content;
	}
}
