import { Component, OnInit } from '@angular/core';

import { DatePeriod } from '@data/models/date-period';
import { User } from '@app/models/user.model';
import { IDailyHoursData } from '../gradient-graphics/gradient-graphics.component';
import { ProjectService } from '@app/services/project.service';
import { Observable, of } from 'rxjs';
import { Project } from '@app/models/project/project.model';
import { map } from 'rxjs/operators';
import { FindResponseProjectInfo } from '@data/api/project-service/models/find-response-project-info';
import { ProjectInfo } from '@data/api/project-service/models/project-info';

@Component({
	selector: 'do-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
	public user: User;

	public timePeriodSelected: DatePeriod = {
		startDate: new Date(),
	};

	public projects$: Observable<Project[]>;

	public dailyHoursData: IDailyHoursData[] = [
		{ day: '22', month: 'june', hours: 6, minutes: 0 },
		{ day: '23', month: 'june', hours: 2, minutes: 30 },
		{ day: '24', month: 'june', hours: 8, minutes: 0 },
		{ day: '25', month: 'june', hours: 8, minutes: 50 },
		{ day: '26', month: 'june', hours: 6, minutes: 30 },
		{ day: '27', month: 'june', hours: 0, minutes: 0 },
	];

	constructor(private _projectService: ProjectService) {
		this.user = null;
	}

	ngOnInit() {
		this.projects$ = this._projectService.getProjectList().pipe(
			map((data: FindResponseProjectInfo) => data.body),
			map((data: ProjectInfo[]) => {
				return data.map((projectInfo: ProjectInfo) => new Project(projectInfo));
			})
		);
	}
}
