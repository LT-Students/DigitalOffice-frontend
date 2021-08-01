import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { DatePeriod } from '@data/models/date-period';
import { AttendanceService } from '@app/services/attendance.service';
import { ProjectStore } from '@data/store/project.store';
import { DateService } from '@app/services/date.service';
import { Project, ProjectModel } from '@app/models/project/project.model';
import { LeaveTimeApiService, WorkTimeApiService } from '@data/api/time-service/services';
import { LocalStorageService } from '@app/services/local-storage.service';
import { WorkTimeInfo } from '@data/api/time-service/models';

@Component({
	selector: 'do-user-tasks',
	templateUrl: './user-tasks.component.html',
	styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit, OnDestroy {
	// @Input() projects: Project[];
	@Input() projects;
	@Input() timePeriodSelected: DatePeriod;

	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

	public projectList: ProjectModel[];
	// TODO: replace projectsList with projects

	public isOrderedByProject = false;
	public isOrderedByHours = false;
	public startPeriod: Date;
	public endPeriod: Date;
	public tasksCount;
	public searchText = '';

	public startDate: Date | null;
	public endDate: Date | null;

	constructor(
		public attendanceService: AttendanceService,
		private projectStore: ProjectStore,
		public dateService: DateService,
	) { }

	ngOnInit() {
		console.log("ПРОЖЕКТЫ В USER-TASKS: ", this.projects)
		this.projectStore.projects$.pipe(takeUntil(this.onDestroy$)).subscribe((projects) => {
			this.projectList = projects;
			this.tasksCount = (this.projectList && this.projectList.length)
				? this.projectList.map((p) => p.tasks).reduce((all, tasks) => all.concat(tasks)).length
				: 0;
		});

		this.attendanceService.datePeriod$.pipe(takeUntil(this.onDestroy$)).subscribe((datePeriod) => {
			this.startDate = datePeriod.startDate;
			this.endDate = datePeriod.endDate;
		});

		const now = new Date();
		this.startPeriod = new Date();
		this.startPeriod.setDate(now.getDate() - 3);
		this.endPeriod = new Date();
		this.endPeriod.setDate(now.getDate() + 3);
	}

	ngOnDestroy() {
		this.onDestroy$.next(null);
		this.onDestroy$.complete();
	}

	onSearch(text: string) {
		this.searchText = text;
	}

	public getPeriod(): string {
		return 'выбранный период';
	}
}
