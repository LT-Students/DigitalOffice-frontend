import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectInfo, ProjectStatusType } from '@api/project-service/models';

interface Section {
	name: string;
	projects: ProjectInfo[];
	plural: any;
}

@Component({
	selector: 'do-employee-page-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
	public sections$!: Observable<[Section, Section]>;

	constructor(private route: ActivatedRoute) {}

	public ngOnInit(): void {
		this.sections$ = this.route.data.pipe(
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
				},
				{
					name: 'Участвовал в',
					projects: projects.filter((project: ProjectInfo) => project.status !== ProjectStatusType.Active),
					plural: {
						one: '# проекте',
						other: '# проектах',
					},
				},
			])
		);
	}
}
