import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { ProjectService } from '@app/services/project/project.service';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { RouteType } from '../../../../app-routing.module';

@Component({
	selector: 'do-projects-table',
	templateUrl: './projects-table.component.html',
	styleUrls: ['./projects-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsTableComponent implements OnInit {
	public projectList: ProjectInfo[];

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

	constructor(
		private _projectService: ProjectService,
		private _router: Router,
		private _cdr: ChangeDetectorRef
	) {
		this.projectList = [];
		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
	}

	public ngOnInit(): void {
		this._getProjectList();
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getProjectList();
	}

	public onProjectClick(projectId: string | undefined): void {
		this._router.navigate([`${RouteType.PROJECT}/${projectId}`]);
	}

	public onAddProjectClick(): void {
		this._router.navigate(['admin/new-project']);
	}

	private _getProjectList(): void {
		this._projectService.findProjects(this.pageIndex * this.pageSize, this.pageSize).subscribe((result) => {
			this.totalCount = result.totalCount ?? 0;
			this.projectList = result.body ?? [];
			this._cdr.detectChanges();
		});
	}
}
