import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { NewOfficeComponent } from '../new-office/new-office.component'
import { OfficeInfo } from '@data/api/company-service/models/office-info'
import { CompanyApiService } from '@data/api/company-service/services/company-api.service'

@Component({
  selector: 'do-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
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
   }

  public ngOnInit(): void {
    this.companyApiService.findOffices({skipCount: this.pageIndex, takeCount: this.pageSize}).subscribe(data => {
      this.totalCount = data.totalCount;
      this.offices = data.offices
    })
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this.companyApiService.findOffices({ skipCount: this.pageIndex, takeCount: this.pageSize }).subscribe((data) => {
			this.offices = data.offices;
		});
  }

  public onAddOfficeClick(): void {
    this.dialog.open(NewOfficeComponent)
  }

}
