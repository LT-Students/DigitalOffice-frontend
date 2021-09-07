import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '@app/services/project/project.service';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { ProjectUserInfo } from '@data/api/project-service/models/project-user-info';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
	selector: 'do-project-page',
	templateUrl: './project-page.component.html',
	styleUrls: ['./project-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit {
	public projectId: string;
	public projectInfo: ProjectInfo | undefined;
	public projectUsers: Array<ProjectUserInfo>;
	public projectCreatedAt: Date;
	public projectDuration: number;
	public svgActiveTabColorSt: string;
	public svgActiveTabColorP: string;

	public dayCountMap: { [k: string]: string } = {
		one: '# день',
		few: '# дня',
		other: '# дней',
	};
	public participantCountMap: { [k: string]: string } = {
		one: '# участник',
		few: '# участника',
		other: '# участников',
	};

	constructor(
		private _route: ActivatedRoute,
		private _projectService: ProjectService,
		private _cdr: ChangeDetectorRef
	) {
		this.projectId = '';
		this.projectUsers = [];
		this.projectCreatedAt = new Date();
		this.projectDuration = 0;
		this.svgActiveTabColorSt = 'grey';
		this.svgActiveTabColorP = 'orange';
	}

	ngOnInit(): void {
		this.projectId = this._route.snapshot.params.id;
		this._projectService
			.getProject({ projectId: this.projectId, includeusers: true, shownotactiveusers: true })
			.subscribe((result) => {
				this.projectInfo = result.body?.project ?? {};
				this.projectUsers = result.body?.users ?? [];
				this.projectCreatedAt = new Date(this.projectInfo?.createdAtUtc);
				this.projectDuration = this._countProjectDuration();
				this._cdr.markForCheck();
			});
	}

	private _countProjectDuration(): number {
		const currentTime = new Date();
		const dayLength = 24 * 60 * 60 * 1000;
		return Math.round((currentTime.getTime() - this.projectCreatedAt.getTime()) / dayLength);
	}

	public tabChanged (event: MatTabChangeEvent): void {
		if(event.index === 1)
		{
			this.svgActiveTabColorSt = 'orange'
			this.svgActiveTabColorP = 'grey'
		} else {
			this.svgActiveTabColorSt = 'grey'
			this.svgActiveTabColorP = 'orange'
		}
	}
}
