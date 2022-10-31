import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

type Color = 'primary' | 'accent';

@Directive({
	selector: 'button[doButton], a[doButton]',
})
export class ButtonDirective implements OnInit {
	@Input()
	set color(c: Color) {
		this.updateColor(c, this._color);
		this._color = c;
	}
	private _color: Color = 'primary';

	constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	public ngOnInit(): void {
		this.renderer.addClass(this.elementRef.nativeElement, 'do-button');
		this.renderer.addClass(this.elementRef.nativeElement, `do-button-${this._color}`);
	}

	private updateColor(newColor: Color, oldColor: Color): void {
		this.renderer.removeClass(this.elementRef.nativeElement, `do-button-${oldColor}`);
		this.renderer.addClass(this.elementRef.nativeElement, `do-button-${newColor}`);
	}
}
