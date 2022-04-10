import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ThisExpression } from 'typescript';

@Directive({
	selector: '[doTooltip]',
})
export class TooltipDirective {
	constructor(private renderer: Renderer2, private el: ElementRef) {
		// this.el.nativeElement.style.backgroundColor = 'yellow';
	}

	// public ngOnInit() {
	// 	// let scroll = this.el.nativeElement.scrollHeight;
	// 	// let client = this.el.nativeElement.clientHeight;
	// 	// console.log(scroll, 'scroll');
	// 	// console.log(client, 'client');

	// }
}
