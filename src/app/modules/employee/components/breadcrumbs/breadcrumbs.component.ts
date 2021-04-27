import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '../../employee-page.component';

@Component({
    selector: 'do-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
    @Input() paths: Path[];

    constructor(private router: Router) {}

    ngOnInit(): void {}

    navigateTo(route: string) {
        this.router.navigate([route]);
    }
}
