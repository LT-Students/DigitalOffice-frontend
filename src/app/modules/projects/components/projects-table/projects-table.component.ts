import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { IFindProjects, ProjectService } from '@app/services/project/project.service';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { iif, Observable, ReplaySubject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ProjectsRoutes } from '../../models/projects-routes';

@Component({
	selector: 'do-projects-table',
	templateUrl: './projects-table.component.html',
	styleUrls: ['./projects-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsTableComponent {
	public ProjectsRoutes = ProjectsRoutes;

	public projectList$: Observable<OperationResultResponse<ProjectInfo[]>>;
	public _projectListParams: ReplaySubject<IFindProjects>;

	constructor(private _projectService: ProjectService, private _route: ActivatedRoute) {
		this._projectListParams = new ReplaySubject<IFindProjects>(1);
		this.projectList$ = this._projectListParams.pipe(
			startWith(null),
			switchMap((params: IFindProjects | null) =>
				iif(
					() => !!params,
					this._projectService.findProjects(params as IFindProjects),
					this._route.data.pipe(map((response) => response.projects))
				)
			)
		);
	}

	public onPageChange(event: PageEvent): void {
		this._projectListParams.next({ skipCount: event.pageIndex * event.pageSize, takeCount: event.pageSize });
	}
}
