import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'do-project-info',
	templateUrl: './project-info.component.html',
	styleUrls: ['./project-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInfoComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
