import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
	selector: '[doTruncateTooltip][matTooltip]',
})
export class TruncateTooltipDirective implements AfterViewInit {
	constructor(private el: ElementRef, private matTooltip: MatTooltip) {}

	public ngAfterViewInit() {
		const scroll = this.el.nativeElement.scrollHeight;
		const client = this.el.nativeElement.clientHeight;
		// in case there's a slight difference in heights because of line-height. Maybe it will result in bugs, but will see.
		const tolerance = 2;
		this.matTooltip.disabled = client + tolerance >= scroll;
	}
}
