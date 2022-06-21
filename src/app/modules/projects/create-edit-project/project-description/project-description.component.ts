import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'do-project-description',
	templateUrl: './project-description.component.html',
	styleUrls: ['./project-description.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDescriptionComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
