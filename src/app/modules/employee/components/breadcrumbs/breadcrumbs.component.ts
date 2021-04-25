import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'do-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
    paths: any[];

    constructor() {
        this.paths = [
            { label: 'Сотрудники', route: 'yo' },
            { label: 'Департамент Цифровых Решений', route: 'yo' },
            { label: 'Ангелина Иванова', route: 'yo' },
        ];
    }

    ngOnInit(): void {}
}
