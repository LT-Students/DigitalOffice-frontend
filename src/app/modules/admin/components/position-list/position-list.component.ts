import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { PositionInfo } from '@data/api/company-service/models/position-info';
import { NetService } from '@app/services/net.service';
import { NewPositionComponent } from '../../modals/new-position/new-position.component';
import { ModalService } from '@app/services/modal.service';

export interface Path {
	title: string;
	url?: string;
}

@Component({
	selector: 'do-position-list',
	templateUrl: './position-list.component.html',
	styleUrls: ['./position-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionListComponent implements OnInit {
	public positions: PositionInfo[];

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;
	public paths: Path[];

	constructor(
		private _modalService: ModalService,
		private _netService: NetService,
		private _cdr: ChangeDetectorRef
	) {
		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
		this.positions = [];
		this.paths = [];
	}

	public ngOnInit(): void {
		this._getPositions();
	}

	public onAddPositionClick(): void {
		this._modalService
			.openModal<NewPositionComponent, null, any>(NewPositionComponent)
			.afterClosed()
			.subscribe(result => {
				if (result?.status === 'FullSuccess') {
					this._getPositions();
				}
			});
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getPositions();
	}

	private _getPositions(): void {
		this._netService.getPositionsList({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize }).subscribe((data) => {
			this.positions = data?.body ?? [];
			console.log(data.body)
			this.totalCount = data?.totalCount ?? 0;
			this._cdr.markForCheck();
		});
	}
}
