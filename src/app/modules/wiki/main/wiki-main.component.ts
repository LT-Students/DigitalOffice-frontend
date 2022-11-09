import { Component } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';

@Component({
	selector: 'do-wiki-main',
	templateUrl: './wiki-main.component.html',
})
export class WikiMainComponent {
	constructor() {}

	public readonly Icons = Icons;
}
