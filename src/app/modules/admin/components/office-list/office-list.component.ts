import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { ModalService } from '@app/services/modal.service';
import { OfficeInfo } from '@data/api/company-service/models';
import { CompanyService } from '@app/services/company/company.service';
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

	constructor(
		private _modalService: ModalService,
		private _companyService: CompanyService,
		private _cdr: ChangeDetectorRef
	) {
		this.offices = [];
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
		this._modalService
			.openModal<NewOfficeComponent, null, any>(NewOfficeComponent)
			.afterClosed()
			.subscribe((result) => {
				// Fix, then backend change to enum
				if (result?.status === 'FullSuccess') this._getOfficeList();
			});
	}

	private _getOfficeList(): void {
		this._companyService
			.findOffices({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize })
			.subscribe((data) => {
				this.totalCount = data.totalCount ?? 0;
				this.offices = data.body ?? [];
				this._cdr.markForCheck();
			});
	}
}
