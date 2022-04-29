//@ts-nocheck
import { Directive } from '@angular/core';
import { MatSelect } from '@angular/material/select';

const OPTION_PANEL_OFFSET = 8.5;

@Directive({
	selector: 'mat-select',
})
export class SelectDirective {
	constructor(private matSelect: MatSelect) {
		matSelect._positions = [
			{
				originX: 'start',
				originY: 'bottom',
				overlayX: 'start',
				overlayY: 'top',
			},
			{
				originX: 'start',
				originY: 'top',
				overlayX: 'start',
				overlayY: 'bottom',
			},
		];

		matSelect._calculateOverlayOffsetY = () => OPTION_PANEL_OFFSET;
		console.log('yo');
	}
}
