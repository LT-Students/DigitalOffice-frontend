import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { ProjectService } from '@app/services/project/project.service';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RouteType } from '../../../../app-routing.module';

@Component({
	selector: 'do-projects-table',
	templateUrl: './projects-table.component.html',
	styleUrls: ['./projects-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsTableComponent {
	public projectList$: Observable<ProjectInfo[]>;

	public totalCount: number;

	constructor(
		private _projectService: ProjectService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {
		this.totalCount = 0;
		this.projectList$ = this._activatedRoute.data.pipe(
			map((data) => data.project),
			tap((projects) => (this.totalCount = projects.totalCount ?? 0)),
			map((projects) => projects.body)
		);
	}

	public onPageChange(event: PageEvent): void {
		this.projectList$ = this._projectService.findProjects(event.pageIndex * event.pageSize, event.pageSize).pipe(
			tap((response) => (this.totalCount = response.totalCount ?? 0)),
			map((response) => response.body ?? []),
			catchError((error) => {
				console.log(error);
				return of([]);
			})
		);
	}

	public onProjectClick(projectId: string | undefined): void {
		this._router.navigate([`${RouteType.PROJECT}/${projectId}`]);
	}
}
