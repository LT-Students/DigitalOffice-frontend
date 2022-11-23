import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'do-wiki-headings-item',
	templateUrl: './wiki-headings-item.component.html',
	styleUrls: ['./wiki-headings-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WikiHeadingsItemComponent {
	@Input() name!: string;

	constructor() {}
}
