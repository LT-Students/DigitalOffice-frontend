import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { EmployeePageService } from '@app/services/employee-page.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'do-employee-page-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
	public ProjectStatus = ProjectStatusType;
	public projects$: Observable<any>;

	public isExpanded = false;

	constructor(private router: Router, private _employeeService: EmployeePageService) {
		this.projects$ = this._employeeService.selectedUser$.pipe(
			map((user) => user?.projects),
			map((projects) => [
				{
					name: 'В работе',
					projects: projects?.filter((project) => project.status === ProjectStatusType.Active) ?? [],
					plural: {
						one: '# проект',
						few: '# проекта',
						other: '# проектов',
					},
				},
				{
					name: 'Участвовал в',
					projects: projects?.filter((project) => project.status !== ProjectStatusType.Active) ?? [],
					plural: {
						one: '# проекте',
						other: '# проектах',
					},
				},
			])
		);
	}

	public ngOnInit(): void {}

	public onMoreClicked(projectId: string | undefined) {
		this.router.navigate(['/project', projectId]);
	}
}
