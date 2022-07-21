import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	InjectionToken,
	Optional,
	Inject,
} from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { coerceNumberProperty } from '@angular/cdk/coercion';

export interface PageEvent {
	pageIndex: number;
	pageSize: number;
}

export interface PaginatorDefaultOptions {
	pageSize: number;
	pageSizeOptions: number[];
}

export const PAGINATOR_DEFAULT_OPTIONS = new InjectionToken<PaginatorDefaultOptions>('PAGINATOR_DEFAULT_OPTIONS');

@Component({
	selector: 'do-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
	public readonly Icons = Icons;

	@Output() page = new EventEmitter<PageEvent>();

	@Input()
	set total(total: any) {
		this._total = coerceNumberProperty(total);
	}
	get total(): number {
		return this._total;
	}
	private _total = 0;

	@Input()
	set pageIndex(index: any) {
		this._pageIndex = coerceNumberProperty(index);
	}
	get pageIndex(): number {
		return this._pageIndex;
	}
	private _pageIndex = 0;

	@Input()
	set pageSize(size: any) {
		const pageSize = coerceNumberProperty(size);
		this._pageSize = pageSize || this.pageSizeOptions[0];
	}
	get pageSize(): number {
		return this._pageSize;
	}
	private _pageSize: number;

	@Input() pageSizeOptions: number[];

	public pages: number[] = [];

	constructor(@Optional() @Inject(PAGINATOR_DEFAULT_OPTIONS) defaults: PaginatorDefaultOptions) {
		this._pageSize = defaults.pageSize;
		this.pageSizeOptions = defaults.pageSizeOptions;
	}

	public ngOnInit(): void {
		this.pages = this.generatePages(this._pageIndex, this.getLastIndex());
	}

	public handlePageSizeChange(pageSize: number): void {
		this._pageSize = pageSize;
		this.navigateToPage(0);
	}

	public previousPage(): void {
		if (!this.hasPreviousPage()) {
			return;
		}
		this.navigateToPage(this._pageIndex - 1);
	}

	public hasPreviousPage(): boolean {
		return this._pageIndex >= 1 && this._pageSize !== 0;
	}

	public nextPage(): void {
		if (!this.hasNextPage()) {
			return;
		}
		this.navigateToPage(this._pageIndex + 1);
	}

	public hasNextPage(): boolean {
		const lastPageIndex = this.getLastIndex();
		return this._pageIndex < lastPageIndex && this._pageSize !== 0;
	}

	public navigateToPage(pageIndex: number): void {
		this._pageIndex = pageIndex;
		this.pages = this.generatePages(pageIndex, this.getLastIndex());
		this.emitPageEvent();
	}

	private getLastIndex(): number {
		return Math.ceil(this._total / this._pageSize) - 1;
	}

	private generatePages(currentIndex: number, lastIndex: number): number[] {
		if (this._total <= this._pageSize) {
			return [0];
		}

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
		this.page.emit({ pageIndex: this._pageIndex, pageSize: this._pageSize });
	}
}
