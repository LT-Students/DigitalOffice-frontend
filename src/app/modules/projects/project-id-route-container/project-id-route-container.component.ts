import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { Subscription } from 'rxjs';
import { SelectedProjectService } from './selected-project.service';

@Component({
	selector: 'do-project-id-route-container',
	template: ` <router-outlet></router-outlet> `,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SelectedProjectService],
})
export class ProjectIdRouteContainerComponent implements OnInit, OnDestroy {
	private subscription!: Subscription;
	constructor(private currentProject: SelectedProjectService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.subscription = this.route.data
			.pipe(map((data: Data) => data.project as ProjectResponse))
			.subscribe({ next: this.currentProject.setProject.bind(this.currentProject) });
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
