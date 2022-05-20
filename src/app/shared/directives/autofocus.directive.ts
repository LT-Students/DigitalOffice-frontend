import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[doAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
	constructor(private elementRef: ElementRef) {}

	public ngAfterViewInit(): void {
		this.elementRef.nativeElement.focus();
	}
}
