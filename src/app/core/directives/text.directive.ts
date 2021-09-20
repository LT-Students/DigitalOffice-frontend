import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
	selector: '[doUnderline]',
})
export class TextDirective implements OnInit {
	@Input() underlinedSize: 'sm' | 'l';

	constructor(private el: ElementRef, private renderer: Renderer2) {
		this.underlinedSize = 'sm';
	}

	public ngOnInit() {
		this.renderer.addClass(this.el.nativeElement, '-underlined');
		this.renderer.addClass(this.el.nativeElement, `-underlined-${this.underlinedSize}`);
	}
}
