import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectResponse } from '@api/project-service/models/project-response';
import {
	TIMELIST_ENTITY_INFO,
	TimelistEntityInfo,
	TimelistEntityType,
} from '../../manager-timelist/models/timelist-entity';
import { SelectedProjectService } from './selected-project.service';

function resolveTimelistEntityInfo(route: ActivatedRoute): TimelistEntityInfo {
	const { id, name } = route.snapshot.data['project'] as ProjectResponse;
	return { entityId: id, name, entityType: TimelistEntityType.Project };
}

@Component({
	selector: 'do-project-id-route-container',
	template: ` <router-outlet></router-outlet> `,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectedProjectService,
		{ provide: TIMELIST_ENTITY_INFO, useFactory: resolveTimelistEntityInfo, deps: [ActivatedRoute] },
	],
})
export class ProjectIdRouteContainerComponent implements OnInit, OnDestroy {
	private subscription!: Subscription;
	constructor(private currentProject: SelectedProjectService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.subscription = this.route.data.subscribe({
			next: (data: Data) => {
				const { project, users, files } = data;
				this.currentProject.setProject({ info: project, users, files });
			},
		});
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
