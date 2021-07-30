import { Component, OnInit } from '@angular/core';

import { DatePeriod } from '@data/models/date-period';
import { User } from '@app/models/user.model';
import { Project } from '@data/models/project';
import { IDailyHoursData } from '../gradient-graphics/gradient-graphics.component';

@Component({
	selector: 'do-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
	public project: Project;
	public user: User;

	public timePeriodSelected: DatePeriod = {
		startDate: new Date(),
	};

	public dailyHoursData: IDailyHoursData[] = [
		{ day: '22', month: 'june', hours: 6, minutes: 0 },
		{ day: '23', month: 'june', hours: 2, minutes: 30 },
		{ day: '24', month: 'june', hours: 8, minutes: 0 },
		{ day: '25', month: 'june', hours: 8, minutes: 50 },
		{ day: '26', month: 'june', hours: 6, minutes: 30 },
		{ day: '27', month: 'june', hours: 0, minutes: 0 },
	];

	constructor() {
		this.user = null;
	}

	ngOnInit() {

	}
}
