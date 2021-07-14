import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { PositionApiService } from '@data/api/company-service/services';
import { PositionInfo } from '@data/api/user-service/models';

import { NewPositionComponent } from '../new-position/new-position.component';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit {
  public positions: PositionInfo[] = []

  public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

  constructor(private dialog: MatDialog, private positionApiService: PositionApiService) { 
    this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
  }

  public ngOnInit(): void {
    this.positionApiService.findPositions({ skipCount: this.pageIndex, takeCount: this.pageSize }).subscribe(data => {
      data.forEach(positionResponse => { 
        this.positions.push(positionResponse.info);
        //@ts-ignore TODO remove ts-ignore when API is fixed
        this.totalCount = positionResponse.totalCount;
      })
    })
  }

  public onAddPositionClick() {
    this.dialog.open(NewPositionComponent);
  }

  public onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
    this.positionApiService.findPositions({ skipCount: this.pageIndex, takeCount: this.pageSize }).subscribe((data) => {
			data.forEach(positionResponse => this.positions.push(positionResponse.info))
		});
  }
}
