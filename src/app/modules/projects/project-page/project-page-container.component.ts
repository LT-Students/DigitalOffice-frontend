import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { map } from 'rxjs/operators';
import { Icons } from '@shared/features/icons/icons';
import { ProjectResponse } from '@api/project-service/models/project-response';

@Component({
	selector: 'do-project-page-container',
	templateUrl: './project-page-container.component.html',
	styleUrls: ['./project-page-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageContainerComponent implements OnInit {
	public readonly Icons = Icons;
	public projectData$ = this.route.data.pipe(map((response: Data) => response.project.body as ProjectResponse));

	constructor(private route: ActivatedRoute) {}

	public ngOnInit(): void {}
}
