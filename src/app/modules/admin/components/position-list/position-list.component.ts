import { Component, OnInit } from '@angular/core';

import { PositionApiService } from '@data/api/company-service/services';
import { NewPositionComponent } from '../new-position/new-position.component';
import { PositionInfo } from '@data/api/company-service/models/position-info';

@Component({
  selector: 'do-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent {
  public positions: PositionInfo[] = [];
  public totalCount: number;

  constructor(private positionApiService: PositionApiService) { }

  public onAddPositionClick({skipCount, takeCount, dialog}): void {
    dialog
		.open(NewPositionComponent)
		.afterClosed()
		.subscribe(() => this.getPositionList(skipCount, takeCount));
  }

  public getPositionList(skipCount = 0, takeCount = 10) {
		return this.positionApiService.findPositions({skipCount, takeCount}).subscribe(data => {
      this.positions = [];
			console.log('Data from positionList: ', data)
			data.forEach(positionResponse => {
        this.positions.push(positionResponse.info);
        //@ts-ignore TODO remove ts-ignore when API is fixed
        // this.totalCount = positionResponse.totalCount;
        //when API is fixed use totalCount from data
        this.totalCount = 50;
      })
		})
	}
}
