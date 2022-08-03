import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { first, map, switchMap } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { TimeService } from '@app/services/time/time.service';
import { DateTime } from 'luxon';
import { UserStatInfo } from '@api/time-service/models/user-stat-info';
import { SelectedProjectService } from '../project-id-route-container/selected-project.service';
import { TeamStatisticsService } from './team-statistics.service';

@Component({
	selector: 'do-team-statistics',
	templateUrl: './team-statistics.component.html',
	styleUrls: ['./team-statistics.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TeamStatisticsService],
})
export class TeamStatisticsComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly maxDate = DateTime.now().plus({ month: 1 });

	public projectName$ = this.selectedProject.info$.pipe(
		map((projectResponse: ProjectResponse) => projectResponse.project.name)
	);
	public tableData = this.teamStatistics.getTableData();
	public expandedRow = this.teamStatistics.getExpandedRowData();
	public filterConfig = this.teamStatistics.getFilters();
	public dataSource$ = this.selectedProject.info$.pipe(
		first(),
		switchMap((proj: ProjectResponse) =>
			this.timeService.findStat({
				projectId: proj.project.id,
				skipCount: 0,
				takeCount: 20,
				year: 2022,
				month: 6,
			})
		),
		map((res) => res.body as UserStatInfo[])
	);

	constructor(
		private teamStatistics: TeamStatisticsService,
		private selectedProject: SelectedProjectService,
		private timeService: TimeService
	) {}

	public ngOnInit(): void {}
}
