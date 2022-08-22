import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectStatusType } from '@api/project-service/models/project-status-type';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppRoutes } from '@app/models/app-routes';
import { ProjectInfo } from '@api/project-service/models/project-info';

interface Section {
	name: string;
	projects: ProjectInfo[];
	plural: any;
	isExpanded: boolean;
}

@Component({
	selector: 'do-employee-page-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
	public ProjectStatus = ProjectStatusType;
	public projects$: Observable<[Section, Section]>;

	constructor(private router: Router, private route: ActivatedRoute) {
		this.projects$ = this.route.data.pipe(
			map((data) => data.projects as ProjectInfo[]),
			map((projects: ProjectInfo[]) => [
				{
					name: 'В работе',
					projects: projects.filter((project: ProjectInfo) => project.status === ProjectStatusType.Active),
					plural: {
						one: '# проект',
						few: '# проекта',
						other: '# проектов',
					},
					isExpanded: false,
				},
				{
					name: 'Участвовал в',
					projects: projects.filter((project: ProjectInfo) => project.status !== ProjectStatusType.Active),
					plural: {
						one: '# проекте',
						other: '# проектах',
					},
					isExpanded: false,
				},
			])
		);
	}

	public ngOnInit(): void {}

	public onMoreClicked(projectId: string) {
		this.router.navigate([AppRoutes.Projects, projectId]);
	}
}
