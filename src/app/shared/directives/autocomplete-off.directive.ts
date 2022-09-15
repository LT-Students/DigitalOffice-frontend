import { Attribute, Directive, HostBinding } from '@angular/core';

@Directive({
	selector: '[matInput]',
})
export class AutocompleteOffDirective {
	@HostBinding('attr.autocomplete') auto;
	constructor(@Attribute('autocomplete') autocomplete: string) {
		this.auto = autocomplete || 'off';
	}
}
