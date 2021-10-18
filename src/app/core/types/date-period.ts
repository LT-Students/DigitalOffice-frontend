import { DateTime } from 'luxon';

export interface DatePeriod {
	startDate: DateTime;
	endDate?: DateTime;
}
