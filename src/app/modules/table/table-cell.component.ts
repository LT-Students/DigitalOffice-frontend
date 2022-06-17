import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, OnDestroy } from '@angular/core';
import { DynamicComponentHostDirective } from '@shared/directives/dynamic-component-host.directive';
import { CellTypes } from './models/table-cell';
import { CellFactoryService } from './cell-factory.service';

@Component({
	selector: 'do-table-cell',
	template: `<ng-template componentHost></ng-template>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [CellFactoryService],
})
export class TableCellComponent implements OnInit, OnDestroy {
	@ViewChild(DynamicComponentHostDirective, { static: true }) cellHost!: DynamicComponentHostDirective;

	@Input()
	set componentType(type: CellTypes | undefined) {
		this._componentType = type ?? 'textCell';
	}
	private _componentType: CellTypes = 'textCell';

	@Input() cellValue: any;
	@Input() cellParams: any;

	constructor(private cellFactory: CellFactoryService) {}

	public ngOnInit(): void {
		this.loadCell();
	}

	public ngOnDestroy(): void {
		this.cellFactory.destroyCell();
	}

	private loadCell(): void {
		const componentRef = this.cellFactory.createCell(this._componentType, this.cellHost);
		componentRef.instance.value = this.cellValue;
		componentRef.instance.params = this.cellParams;
	}
}
