//@ts-nocheck
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { PositionInfo } from '@data/api/company-service/models/position-info';
import { NetService } from '@app/services/net.service';
import { NewPositionComponent } from '../../modals/new-position/new-position.component';

@Component({
	selector: 'do-position-list',
	templateUrl: './position-list.component.html',
	styleUrls: ['./position-list.component.scss'],
})
export class PositionListComponent implements OnInit {
	public positions: PositionInfo[];

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

	constructor(private dialog: MatDialog, private _netService: NetService) {
		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
		this.positions = [];
	}

	public ngOnInit(): void {
		this._getPositions();
	}

	public onAddPositionClick(): void {
		this.dialog.open(NewPositionComponent);
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getPositions();
	}

	private _getPositions(): void {
		this._netService.getPositionsList({ skipCount: this.pageIndex, takeCount: this.pageSize }).subscribe((data) => {
			data.body.forEach((positionResponse) => {
				this.positions.push(positionResponse);
			});
			this.totalCount = data.totalCount;
		});
	}
}
