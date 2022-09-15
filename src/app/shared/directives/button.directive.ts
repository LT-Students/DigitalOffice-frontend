import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
	selector: 'button[doButton], a[doButton]',
})
export class ButtonDirective implements OnInit {
	constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	public ngOnInit(): void {
		this.renderer.addClass(this.elementRef.nativeElement, 'do-button');
	}
}
