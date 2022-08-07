import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';

@Pipe({
	name: 'formatBytes',
})
export class FormatBytesPipe implements PipeTransform {
	constructor(@Inject(LOCALE_ID) private locale: string) {}

	transform(bytes: number, precision?: number, onlyNumber = false): string {
		const size = formatBytes(bytes, this.locale, precision);
		return onlyNumber ? size.split(' ')[0] : size;
	}
}

export function formatBytes(bytes: number, locale: string, precision = 0): string {
	if (bytes === 0) return '0 байт';

	const k = 1024;
	const dm = precision < 0 ? 0 : precision;
	const sizes = ['байт', 'KB', 'MB', 'GB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return formatNumber(parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), locale) + ' ' + sizes[i];
}
