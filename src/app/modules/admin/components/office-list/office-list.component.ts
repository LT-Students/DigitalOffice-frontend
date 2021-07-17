import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OfficeInfo } from '@data/api/company-service/models/office-info';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { NewOfficeComponent } from '../new-office/new-office.component';

@Component({
	selector: 'do-office-list',
	templateUrl: './office-list.component.html',
	styleUrls: ['./office-list.component.scss'],
})
export class OfficeListComponent {
	public offices: OfficeInfo[];
	public totalCount: number;

	constructor(public companyApiService: CompanyApiService) {}

	public onAddOfficeClick({skipCount, takeCount, dialog}): void {
		dialog
		.open(NewOfficeComponent)
		.afterClosed()
		.subscribe(() => this.getOfficeList(skipCount, takeCount));
	}

	public getOfficeList(skipCount = 0, takeCount = 10) {
		return this.companyApiService.findOffices({skipCount, takeCount}).subscribe(data => {
			console.log('Data from getList: ', data)
			this.offices = data.offices;
			this.totalCount = data.totalCount;
		})
	}
}
