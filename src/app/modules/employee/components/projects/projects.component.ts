import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { EmployeePageService } from '@app/services/employee-page.service';
import { map } from 'rxjs/operators';
import { ProjectInfo } from '@data/api/user-service/models/project-info';

interface Group {
	name: string;
	projects: ProjectInfo[];
	plural: { [p: string]: string };
}

@Component({
	selector: 'do-employee-page-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
	public activeProjects: ProjectInfo[];
	public closedProjects: ProjectInfo[];
	public pluralForm: any;
	public groups: Group[];

	constructor(private router: Router, private _employeeService: EmployeePageService) {
		this.activeProjects = [];
		this.closedProjects = [];
		this.pluralForm = {
			activeProjectsTitle: {
				one: '# проект',
				few: '# проекта',
				other: '# проектов',
			},
			closedProjectsTitle: {
				one: '# проекте',
				other: '# проектах',
			},
		};
	}

	public ngOnInit(): void {
		this._employeeService.selectedUser$.pipe(
			map((user) => user?.projects)
		).subscribe({
			next: (projects) => {
				this._filterProject(projects);
			}
		})
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

	public onMoreClicked(projectId: string | undefined) {
		this.router.navigate(['/project', projectId]);
	}

	private _filterProject(projects: ProjectInfo[] | null | undefined) {
		if (projects != null) {
			this.activeProjects = projects.filter((project: ProjectInfo) => {
				const projectStatus = project.status as ProjectStatusType;
				return projectStatus === ProjectStatusType.Active;
			});
			this.closedProjects = projects.filter((project: ProjectInfo) => {
				const projectStatus = project.status as ProjectStatusType;
				return projectStatus === ProjectStatusType.Closed;
			});
		}
	}
}
