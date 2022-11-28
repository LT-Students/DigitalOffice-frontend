import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[treeNodeDragHandle]',
})
export class TreeNodeDragHandleDirective {
	constructor(public elementRef: ElementRef) {}
}
