import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { Icons } from '@shared/modules/icons/icons';
import { AppRoutes } from '@app/models/app-routes';

@Component({
	selector: 'do-project-card',
	templateUrl: './project-card.component.html',
	styleUrls: ['./project-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent implements OnInit {
	public readonly Icons = Icons;

	@Input() project!: ProjectInfo;

	public projectRoute!: string[];

	constructor() {}

	ngOnInit(): void {
		this.projectRoute = ['/', AppRoutes.Projects, this.project.id];
	}
}
