import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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
	public pageSize: number;
	public pageIndex: number;

	constructor(private _projectService: ProjectService, private _router: Router, private _cdr: ChangeDetectorRef) {
		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
		this.projectList$ = this._getProjectList();
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this.projectList$ = this._getProjectList();
	}

	public onProjectClick(projectId: string | undefined): void {
		this._router.navigate([`${RouteType.PROJECT}/${projectId}`]);
	}
	private _getProjectList(): Observable<ProjectInfo[]> {
		return this._projectService.findProjects(this.pageIndex * this.pageSize, this.pageSize).pipe(
			tap((response) => (this.totalCount = response.totalCount ?? 0)),
			map((response) => response.body ?? []),
			catchError((error) => {
				console.log(error);
				return of([]);
			})
		);
	}
}
