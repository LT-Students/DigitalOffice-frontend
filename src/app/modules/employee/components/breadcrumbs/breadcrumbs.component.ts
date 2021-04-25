import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'do-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
    @Input() department: string = 'Департамент Цифровых Решений';
    @Input() employeeName: string = 'Ангелина Иванова';

    paths: any[];

    constructor(private router: Router) {
        this.paths = [
            { label: 'Сотрудники', route: 'user/attendance' },
            { label: this.department, route: 'user/attendance' },
            { label: this.employeeName, },
        ];
    }

    ngOnInit(): void {}

    onClickBreadcrumbs(route: string) {
        this.router.navigate([route]);
    }
}
