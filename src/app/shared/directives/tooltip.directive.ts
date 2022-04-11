import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
	selector: '[doTooltip][matTooltip]',
})
export class TooltipDirective implements AfterViewInit {
	constructor(private el: ElementRef, private matTooltip: MatTooltip) {}

	public ngAfterViewInit() {
		let scroll = this.el.nativeElement.scrollHeight;
		let client = this.el.nativeElement.clientHeight;
		this.matTooltip.disabled = client >= scroll;
	}
}
