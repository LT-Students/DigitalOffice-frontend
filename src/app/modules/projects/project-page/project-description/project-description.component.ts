import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'do-project-description',
	template: `<mat-card class="description">{{ description | placeholder: 'Описание отсутствует' }}</mat-card> `,
	styles: ['.description { white-space: pre-line; }'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDescriptionComponent implements OnInit {
	@Input() description? = '';

	constructor() {}

	ngOnInit(): void {}
}
