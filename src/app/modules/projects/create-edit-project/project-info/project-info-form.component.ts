import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'do-project-info-form',
	templateUrl: './project-info-form.component.html',
	styleUrls: ['./project-info-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInfoFormComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
