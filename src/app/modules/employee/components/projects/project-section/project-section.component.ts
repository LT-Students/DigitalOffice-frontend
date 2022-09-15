import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { Icons } from '@shared/modules/icons/icons';

@Component({
	selector: 'do-project-section',
	templateUrl: './project-section.component.html',
	styleUrls: ['./project-section.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSectionComponent implements OnInit {
	public readonly Icons = Icons;

	@Input()
	set projects(projects: ProjectInfo[] | null) {
		this._projects = projects || [];
	}
	get projects(): ProjectInfo[] {
		return this._projects;
	}
	private _projects: ProjectInfo[] = [];

	@Input() name = '';
	@Input() pluralCase: Record<string, string> = {};

	public isExpanded = false;

	constructor() {}

	ngOnInit(): void {}
}
