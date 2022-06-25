import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'do-project-description',
	template: `<mat-card>{{ description | placeholder: 'Описание отсутствует' }}</mat-card> `,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDescriptionComponent implements OnInit {
	@Input() description? = '';

	constructor() {}

	ngOnInit(): void {}
}
