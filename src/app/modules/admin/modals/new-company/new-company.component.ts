//@ts-nocheck
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'do-new-company',
	templateUrl: './new-company.component.html',
	styleUrls: ['./new-company.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCompanyComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
