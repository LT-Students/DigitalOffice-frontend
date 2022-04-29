import { MatDateFormats } from '@angular/material/core';

export const DATE_FORMAT: MatDateFormats = {
	parse: {
		dateInput: 'D',
	},
	display: {
		dateInput: 'dd MMMM y',
		monthYearLabel: 'LLLL y',
		dateA11yLabel: 'dd MMMM y',
		monthYearA11yLabel: 'YYYY',
	},
};

export const RANGE_DATE_FORMAT: MatDateFormats = {
	parse: {
		dateInput: 'D',
	},
	display: {
		dateInput: 'dd/MM/y',
		monthYearLabel: 'LLLL y',
		dateA11yLabel: 'dd MMMM y',
		monthYearA11yLabel: 'YYYY',
	},
};
