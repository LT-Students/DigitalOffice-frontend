import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { NewOfficeComponent } from '../new-office/new-office.component'
import { OfficeInfo } from '@data/api/company-service/models/office-info'

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent implements OnInit {
  public offices: OfficeInfo[] = [
    {name: 'Офис $1'},
    {name: 'Офис %2'},
    {name: 'Офис #3'}
  ]

  public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

  constructor(private dialog: MatDialog) {
    this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
   }

  ngOnInit(): void {
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		// this.roleApiService.findRoles({ skipCount: this.pageIndex, takeCount: this.pageSize }).subscribe((data) => {
		// 	this.roles = data.roles;
		// });
  }

  public onAddOfficeClick() {
    this.dialog.open(NewOfficeComponent)
  }

}
