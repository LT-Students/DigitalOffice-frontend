import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'do-create-edit-project',
	templateUrl: './create-edit-project.component.html',
	styleUrls: ['./create-edit-project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditProjectComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
