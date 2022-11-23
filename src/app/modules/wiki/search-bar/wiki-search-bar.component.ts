import { Component } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';

@Component({
	selector: 'do-wiki-search-bar',
	templateUrl: './wiki-search-bar.component.html',
	styleUrls: ['./wiki-search-bar.component.scss'],
})
export class WikiSearchBarComponent {
	constructor() {}
	public readonly Icons = Icons;
}
