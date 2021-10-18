import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Info } from 'luxon';

@Injectable()
export class DoDateAdapter extends LuxonDateAdapter {
	constructor(@Inject(LOCALE_ID) public locale: string) {
		super(locale);
	}

	public getFirstDayOfWeek(): number {
		return getLocaleFirstDayOfWeek(this.locale);
	}

	public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
		if (style === 'narrow' && this.locale === 'ru-RU') {
			return ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
		}

		const days = Info.weekdays(style, { locale: this.locale });
		days.unshift(days.pop() as string);
		return days;
	}
}
