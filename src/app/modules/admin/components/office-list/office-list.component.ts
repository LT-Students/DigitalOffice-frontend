import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { OfficeInfo } from '@data/api/company-service/models/office-info';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { NewOfficeComponent } from '../../modals/new-office/new-office.component';

@Component({
	selector: 'do-office-list',
	templateUrl: './office-list.component.html',
	styleUrls: ['./office-list.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeListComponent implements OnInit {
	public offices: OfficeInfo[];

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

	constructor(private dialog: MatDialog, private companyApiService: CompanyApiService) {
		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
		this.offices = [];
	}

	public ngOnInit(): void {
		this._getOfficeList();
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getOfficeList();
	}

	public onAddOfficeClick(): void {
		this.dialog.open(NewOfficeComponent);
	}

	private _getOfficeList(): void {
		this.companyApiService.findOffices({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize }).subscribe((data) => {
			this.totalCount = data?.totalCount ?? 0;
			this.offices = data?.body ?? [];
		});
	}
}
