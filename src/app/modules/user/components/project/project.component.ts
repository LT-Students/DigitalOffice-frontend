import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from '@app/models/project/project.model';

@Component({
	selector: 'do-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
	@Input() project: ProjectModel;
	isEdited = false;
	hours = 0;
	minutes = 0;
	public cardOpenState: boolean;

	constructor() {
		this.cardOpenState = false;
	}

	ngOnInit() {}

	toggleInput() {
		this.isEdited = !this.isEdited;
	}
}
