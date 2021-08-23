//@ts-nocheck
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '@app/services/project/project.service';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { ProjectUserInfo } from '@data/api/project-service/models/project-user-info';

@Component({
	selector: 'do-project-page',
	templateUrl: './project-page.component.html',
	styleUrls: ['./project-page.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit {
	public projectId: string;
	public projectInfo: ProjectInfo;
	public projectUsers: Array<ProjectUserInfo>;
	public projectCreatedAt: Date;
	public projectDuration: number;

	constructor(private _route: ActivatedRoute, private _projectService: ProjectService) {}

	ngOnInit(): void {
		this.projectId = this._route.snapshot.params.id;
		this._projectService.getProject({ projectId: this.projectId, includeusers: true }).subscribe((result) => {
			this.projectInfo = result.body.project;
			this.projectUsers = result.body.users;
			this.projectCreatedAt = new Date(this.projectInfo.createdAt);
			console.log(this.projectInfo);
			this.projectDuration = this._countProjectDuration();
		});
	}

	private _countProjectDuration(): number {
		const currentTime = new Date();
		const dayLength = 24 * 60 * 60 * 1000;

		return Math.round(Math.abs((currentTime.getTime() - this.projectCreatedAt.getTime()) / dayLength));
	}
}
