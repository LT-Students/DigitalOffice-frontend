import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
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
		this.subscription = this.route.data.subscribe({
			next: (data: Data) => {
				const { project, users } = data;
				this.currentProject.setProject({ info: project, users });
			},
		});
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
