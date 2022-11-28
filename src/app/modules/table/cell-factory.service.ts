import { ComponentRef, Injectable } from '@angular/core';
import { DynamicComponentHostDirective } from '@shared/directives/dynamic-component-host.directive';
import { ComponentType } from '@angular/cdk/overlay';
import { CELL_TYPES, CellTypes, TableCell } from './models';

@Injectable()
export class CellFactoryService {
	private componentRef?: ComponentRef<any>;

	constructor() {}

	public createCell(
		cellType: CellTypes | ComponentType<TableCell<any>>,
		cellHost: DynamicComponentHostDirective
	): ComponentRef<TableCell<any>> {
		const component = typeof cellType === 'string' ? this.getCellComponentByType(cellType) : cellType;
		const viewContainerRef = cellHost.viewContainerRef;
		viewContainerRef.clear();
		this.componentRef = viewContainerRef.createComponent(component);
		return this.componentRef;
	}

	public destroyCell(): void {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}

	private getCellComponentByType(type: CellTypes): ComponentType<TableCell<any>> {
		return CELL_TYPES[type];
	}
}
