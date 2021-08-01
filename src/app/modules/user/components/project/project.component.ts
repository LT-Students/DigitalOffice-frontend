import { Component, Input } from '@angular/core';

@Component({
	selector: 'do-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
	@Input() public project;
	isEdited = false;
	hours = 0;
	minutes = 0;
	public cardOpenState: boolean;

	constructor() {
		this.cardOpenState = false;
	}

	toggleInput() {
		this.isEdited = !this.isEdited;
	}
}
