import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectInfo } from '@data/api/user-service/models/project-info';
import { UserProject } from '../../employee-page.component';


interface Group {
	name: string;
	projects: ProjectInfo[];
	plural: {[p: string]: string};
}

@Component({
	selector: 'do-employee-page-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
	@Input() projects: ProjectInfo[];

	public activeProjects: ProjectInfo[];
	public closedProjects: ProjectInfo[];
	public pluralForm;
	public groups: Group[];

	constructor(private router: Router) {
		this.activeProjects = null;
		this.closedProjects = null;
		this.pluralForm = {
			activeProjectsTitle: {
				one: '# проект',
				few: '# проекта',
				other: '# проектов'
			},
			closedProjectsTitle: {
				one: '# проекте',
				other: '# проектах'
			},
		};
	}

	ngOnInit(): void {
		// TODO: add full project data fetching after initalizing
		this._filterProject(this.projects);

		this.groups = [
			{
				name: 'В работе',
				projects: this.activeProjects,
				plural: this.pluralForm.activeProjectsTitle,
			},
			{
				name: 'Участвовал в',
				projects: this.closedProjects,
				plural: this.pluralForm.closedProjectsTitle,
			},
		];
	}

	public expandProjects(group): void {
		group.expanded = !group.expanded;
	}

	public onMoreClicked(projectId: string) {
		this.router.navigate(['/project', projectId]);
	}

	private _filterProject(rawProjects: ProjectInfo[]) {
		this.activeProjects = rawProjects.filter((project: UserProject) => project.isActive);
		this.closedProjects = rawProjects.filter((project: UserProject) => !project.isActive);
	}
}
