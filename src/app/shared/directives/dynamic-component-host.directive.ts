import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[componentHost]',
})
export class DynamicComponentHostDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}
