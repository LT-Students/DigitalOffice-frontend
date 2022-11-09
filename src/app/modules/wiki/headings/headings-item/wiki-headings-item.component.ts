import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RubricData } from '@api/wiki-service/models/rubric-data';

@Component({
	selector: 'do-wiki-headings-item',
	templateUrl: './wiki-headings-item.component.html',
	styleUrls: ['./wiki-headings-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WikiHeadingsItemComponent implements OnInit {
	@Input() rubric!: RubricData;

	constructor() {}

	public name!: string;

	public ngOnInit(): void {
		this.name = this.rubric.name;
	}
}
