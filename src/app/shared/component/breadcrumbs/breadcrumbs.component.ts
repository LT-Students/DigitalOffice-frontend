import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

export interface Path {
	title: string;
	url?: string;
}

@Component({
	selector: 'do-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
	@Input() public paths: Path[];

	constructor(private _router: Router) {
		this.paths = [];
	}

	ngOnInit(): void {}

	onRouteClicked(route: Path) {
		if (route.url) {
			this._router.navigate([route.url]);
		}
	}
}
