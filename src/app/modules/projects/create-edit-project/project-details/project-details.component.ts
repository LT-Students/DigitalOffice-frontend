import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/features/icons/icons';
import { ProjectStatus } from '../../models/project-status';

@Component({
	selector: 'do-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsComponent implements OnInit {
	public readonly Icons = Icons;
	public statuses = ProjectStatus.getAllStatuses();

	constructor() {}

	ngOnInit(): void {}
}
