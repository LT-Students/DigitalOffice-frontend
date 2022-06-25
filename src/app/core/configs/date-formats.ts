import { MatDateFormats } from '@angular/material/core';

export const DATE_FORMAT: MatDateFormats = {
	parse: {
		dateInput: ['d MMMM y', 'd LLLL y'],
	},
	display: {
		dateInput: 'd MMMM y',
		monthYearLabel: 'LLLL y',
		dateA11yLabel: 'dd MMMM y',
		monthYearA11yLabel: 'YYYY',
	},
};

export const RANGE_DATE_FORMAT: MatDateFormats = {
	parse: {
		dateInput: 'dd/MM/y',
	},
	display: {
		dateInput: 'dd/MM/y',
		monthYearLabel: 'LLLL y',
		dateA11yLabel: 'dd MMMM y',
		monthYearA11yLabel: 'YYYY',
	},
};
