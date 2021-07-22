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

	constructor(public companyApiService: CompanyApiService) { }

	public onAddOfficeClick({ skipCount, takeCount, dialog }): void {
		dialog
			.open(NewOfficeComponent)
			.afterClosed()
			.subscribe(() => this.getOfficeList(skipCount, takeCount));
	}

	private _getOfficeList(): void {
		this.companyApiService.findOffices({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize }).subscribe((data) => {
			this.totalCount = data.totalCount;
			this.offices = data.body;
		});
	}
}
