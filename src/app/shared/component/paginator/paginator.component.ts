import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';

export interface PageEvent {
	pageIndex: number;
	pageSize: number;
}

@Component({
	selector: 'do-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
	public readonly Icons = Icons;

	@Output() page = new EventEmitter<PageEvent>();
	@Input() length = 0;
	@Input() pageIndex = 0;
	@Input() pageSize = 10;
	@Input() pageSizeOptions = [10, 20, 30];

	public pages: number[] = [];

	constructor() {}

	public ngOnInit(): void {
		this.pages = this.generatePages(this.pageIndex, this.getLastIndex());
	}

	public handlePageSizeChange(pageSize: number): void {
		this.pageSize = pageSize;
		this.navigateToPage(0);
	}

	public previousPage(): void {
		if (!this.hasPreviousPage()) {
			return;
		}
		this.navigateToPage(this.pageIndex - 1);
	}

	public hasPreviousPage(): boolean {
		return this.pageIndex >= 1 && this.pageSize !== 0;
	}

	public nextPage(): void {
		if (!this.hasNextPage()) {
			return;
		}
		this.navigateToPage(this.pageIndex + 1);
	}

	public hasNextPage(): boolean {
		const lastPageIndex = this.getLastIndex();
		return this.pageIndex < lastPageIndex && this.pageSize !== 0;
	}

	public navigateToPage(pageIndex: number): void {
		this.pageIndex = pageIndex;
		this.pages = this.generatePages(pageIndex, this.getLastIndex());
		this.emitPageEvent();
	}

	private getLastIndex(): number {
		return Math.ceil(this.length / this.pageSize) - 1;
	}

	private generatePages(currentIndex: number, lastIndex: number): number[] {
		const delta = 2;
		const range: number[] = [];

		range.push(0);
		for (let i = currentIndex - delta; i <= currentIndex + delta; i++) {
			if (i < lastIndex && i > 0) {
				range.push(i);
			}
		}
		range.push(lastIndex);

		const rangeWithDots: number[] = [];
		let l: number;

		range.forEach((i: number) => {
			if (l != null) {
				if (i - l === 2) {
					rangeWithDots.push(l + 1);
				} else if (i - l !== 1) {
					rangeWithDots.push(-1);
				}
			}
			rangeWithDots.push(i);
			l = i;
		});

		return rangeWithDots;
	}

	private emitPageEvent(): void {
		this.page.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize });
	}
}
