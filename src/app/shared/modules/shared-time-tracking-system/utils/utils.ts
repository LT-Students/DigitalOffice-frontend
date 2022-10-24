import { DateTime } from 'luxon';
import { LAST_DAY_TO_FILL_HOURS } from '../models';

export function getMinDateToFillHours(): DateTime {
	const date = DateTime.now();
	return (date.day <= LAST_DAY_TO_FILL_HOURS ? date.minus({ month: 1 }) : date).startOf('month');
}
