import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Injector,
	Input,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { DynamicComponentHostDirective } from '@shared/directives/dynamic-component-host.directive';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { FilterParams, FilterTypes } from './models/filter';
import { FilterFactoryService } from './filter-factory.service';

@Component({
	selector: 'do-filter',
	template: `<ng-template componentHost></ng-template>`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterFactoryService,
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FilterBaseComponent),
			multi: true,
		},
	],
})
export class FilterBaseComponent implements OnInit, OnDestroy {
	@ViewChild(DynamicComponentHostDirective, { static: true }) filterHost!: DynamicComponentHostDirective;

	@Input()
	set type(type: FilterTypes | undefined) {
		this._type = type ?? 'input';
	}
	private _type: FilterTypes = 'input';

	@Input() params?: FilterParams;

	constructor(private filterFactory: FilterFactoryService, private injector: Injector) {}

	public ngOnInit(): void {
		this.loadFilter();
	}

	public ngOnDestroy(): void {
		this.filterFactory.destroyFilter();
	}

	private loadFilter(): void {
		const ngControl = this.injector.get(NgControl);
		const componentRef = this.filterFactory.createFilter(this._type, this.filterHost);
		componentRef.instance.params = this.params;
		ngControl.valueAccessor = componentRef.instance;
	}
}
