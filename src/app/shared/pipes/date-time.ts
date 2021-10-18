import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
	name: 'dateTime',
})
export class DateTimePipe implements PipeTransform {
	transform<T extends DateTime | null | undefined>(value: T, format: string) {
		return (value == null ? null : value.toFormat(format)) as T extends DateTime ? string : null;
	}
}
