import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Icons } from '@shared/features/icons/icons';
import { SelectedProjectService } from '../project-id-route-container/selected-project.service';

@Component({
	selector: 'do-project-page-container',
	templateUrl: './project-page-container.component.html',
	styleUrls: ['./project-page-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageContainerComponent implements OnInit {
	public readonly Icons = Icons;
	public projectData$ = this.selectedProject.project$;

	constructor(private selectedProject: SelectedProjectService) {}

	public ngOnInit(): void {}
}
