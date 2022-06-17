import { ComponentFactoryResolver, ComponentRef, Injectable } from '@angular/core';
import { DynamicComponentHostDirective } from '@shared/directives/dynamic-component-host.directive';
import { ComponentType } from '@angular/cdk/overlay';
import { Filter, FILTER_TYPES, FilterTypes } from './models/filter';

@Injectable()
export class FilterFactoryService {
	private componentRef?: ComponentRef<any>;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

	public createFilter(filterType: FilterTypes, filterHost: DynamicComponentHostDirective): ComponentRef<Filter<any>> {
		const component = this.getFilterComponentByType(filterType);
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory<Filter<any>>(component);
		const viewContainerRef = filterHost.viewContainerRef;
		viewContainerRef.clear();
		this.componentRef = viewContainerRef.createComponent(componentFactory);
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
