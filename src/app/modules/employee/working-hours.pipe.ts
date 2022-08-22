import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

type WorkingHours = DateTime | string | undefined;

@Pipe({
	name: 'workingHours',
})
export class WorkingHoursPipe implements PipeTransform {
	transform([fromTime, toTime]: [WorkingHours, WorkingHours]): string | null {
		if (!fromTime && !toTime) {
			return null;
		}
		fromTime = fromTime && this.formatTime(fromTime);
		toTime = toTime && this.formatTime(toTime);

		if (fromTime && toTime) {
			return `${fromTime} - ${toTime}`;
		}
		if (fromTime) {
			return `С ${fromTime}`;
		}
		return `До ${toTime}`;
	}

	private formatTime(d: DateTime | string): string {
		const date = d instanceof DateTime ? d : DateTime.fromISO(d);
		return date.toFormat('HH:mm');
	}
}
