import { DateTime } from 'luxon';

export const FULL_WORKDAY_LENGTH_IN_HOURS = 8;
export const LAST_DAY_TO_FILL_HOURS = 10;
export const MAX_FUTURE_DATE_FOR_LEAVE_TIME = DateTime.now().plus({ month: 1 }).endOf('month');
