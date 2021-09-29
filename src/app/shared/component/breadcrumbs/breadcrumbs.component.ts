import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '../../../modules/admin/components/new-project/new-project.component';
// import { Path } from '../../../modules/employee/employee-page.component';


@Component({
	selector: 'do-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
	@Input() public paths: Path[];

	constructor(private router: Router) {
		this.paths = [];
	}

	ngOnInit(): void {}

	onRouteClicked(route: Path) {
		if (route.url) {
			this.router.navigate([route.url]);
		}
	}
}
