import { ComponentFactoryResolver, ComponentRef, Injectable } from '@angular/core';
import { DynamicComponentHostDirective } from '@shared/directives/dynamic-component-host.directive';
import { ComponentType } from '@angular/cdk/overlay';
import { CELL_TYPES, CellTypes, TableCell } from './models';

@Injectable()
export class CellFactoryService {
	private componentRef?: ComponentRef<any>;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

	public createCell(cellType: CellTypes, cellHost: DynamicComponentHostDirective): ComponentRef<TableCell<any>> {
		const component = this.getCellComponentByType(cellType);
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory<TableCell<any>>(component);
		const viewContainerRef = cellHost.viewContainerRef;
		viewContainerRef.clear();
		this.componentRef = viewContainerRef.createComponent(componentFactory);
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
