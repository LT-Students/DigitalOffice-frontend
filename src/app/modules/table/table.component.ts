import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';
import { ColumnDef } from './models/column-def';

export class SimpleDataSource<T> extends DataSource<T> {
	constructor(private data$: Observable<T[]>) {
		super();
	}
	public connect(collectionViewer: CollectionViewer): Observable<T[]> {
		return this.data$;
	}

	public disconnect(collectionViewer: CollectionViewer): void {}
}

@Component({
	selector: 'do-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit {
	@Output() rowClick = new EventEmitter<T>();

	@Input()
	set rowHeight(height: any) {
		this._rowHeight = coerceNumberProperty(height);
	}
	get rowHeight(): number {
		return this._rowHeight;
	}
	private _rowHeight = 0;
	@Input() dataSource!: DataSource<T>;
	@Input() columns: ColumnDef[] = [];
	public displayColumns: string[] = [];
	@Input() message = 'Нет данных';

	constructor() {}

	public ngOnInit(): void {
		this.displayColumns = this.columns.map((col: ColumnDef) => col.field);
	}
}
