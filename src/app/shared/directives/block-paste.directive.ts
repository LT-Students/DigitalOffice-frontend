import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[blockPaste]',
})
export class BlockPasteDirective {
	constructor() {}
	@HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
		e.preventDefault();
	}
}
