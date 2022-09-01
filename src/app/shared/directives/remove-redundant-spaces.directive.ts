import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgControl } from '@angular/forms';

@Directive({
	selector: '[doRemoveRedundantSpaces]',
})
export class RemoveRedundantSpacesDirective implements OnInit, OnDestroy {
	public subscription?: Subscription;

	constructor(private ngControl: NgControl) {}

	public ngOnInit(): void {
		this.subscription = this.ngControl.control?.valueChanges.subscribe((value: string) => {
			const newValue = this.transform(value);
			this.ngControl.control?.setValue(newValue, { emitEvent: false });
		});
	}

	private transform(value: string): string {
		return value.replace(/^\s+/g, '').replace(/\s+/g, ' ');
	}

	public ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
