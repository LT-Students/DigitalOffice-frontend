import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
	selector: '[doAutofocus]',
})
export class AutofocusDirective implements OnInit {
	constructor(private elementRef: ElementRef) {}

	public ngOnInit(): void {
		this.elementRef.nativeElement.focus();
	}
}
