import { ComponentRef, Injectable } from '@angular/core';
import { DynamicComponentHostDirective } from '@shared/directives/dynamic-component-host.directive';
import { ComponentType } from '@angular/cdk/overlay';
import { Filter, FILTER_TYPES, FilterTypes } from './models';

@Injectable()
export class FilterFactoryService {
	private componentRef?: ComponentRef<any>;

	constructor() {}

	public createFilter(filterType: FilterTypes, filterHost: DynamicComponentHostDirective): ComponentRef<Filter<any>> {
		const component = this.getFilterComponentByType(filterType);
		const viewContainerRef = filterHost.viewContainerRef;
		viewContainerRef.clear();
		this.componentRef = viewContainerRef.createComponent(component);
		return this.componentRef;
	}

	public destroyFilter(): void {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}

	private getFilterComponentByType(type: FilterTypes): ComponentType<Filter<any>> {
		return FILTER_TYPES[type];
	}
}
